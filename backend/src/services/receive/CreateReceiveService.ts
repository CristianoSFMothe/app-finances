import prismaClient from "../../prisma";
import { validate } from "class-validator";
import { plainToClass } from "class-transformer";
import { CreateReceiveDto } from "../../dto/receive/CreateReceiveDto"; // Certifique-se de que o caminho esteja correto

interface ReceiveRequest {
  description: string;
  value: number;
  type: string;
  date: string;
  user_id: string;
}

class CreateReceiveService {
  async execute({ description, type, value, date, user_id }: ReceiveRequest) {
    // Transforma os dados de entrada em uma instância do DTO
    const receiveDto = plainToClass(CreateReceiveDto, { description, type, value, date, user_id });

    // Valida o DTO
    const errors = await validate(receiveDto);

    if (errors.length > 0) {
      const messages = errors.map(error => Object.values(error.constraints)).flat();
      throw new Error(messages.join(', '));
    }

    // Verifica se o user_id é válido
    if (!user_id) {
      throw new Error("Invalid user");
    }

    const findUser = await prismaClient.user.findFirst({
      where: {
        id: user_id,
      },
    });

    if (!findUser) {
      throw new Error("Usuário não encontrado.");
    }

    // Atualiza o saldo do usuário com base no tipo
    const updatedBalance = type === "receita" 
      ? findUser.balance + Number(value)
      : findUser.balance - Number(value);

    await prismaClient.user.update({
      where: {
        id: user_id,
      },
      data: {
        balance: updatedBalance,
      },
    });

    // Cria o novo recebimento
    const newReceive = await prismaClient.receive.create({
      data: {
        description,
        type,
        value,
        date,
        user_id,
      },
    });

    return newReceive;
  }
}

export { CreateReceiveService };
