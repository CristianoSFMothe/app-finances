import prismaClient from "../../prisma";
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { validate } from 'class-validator';
import { plainToClass } from 'class-transformer';
import { LoginDto } from "../../dto/user/LoginDto"; // Certifique-se de que o caminho esteja correto

interface AuthRequest {
  email: string;
  password: string;
}

class AuthUserService {
  async execute({ email, password }: AuthRequest) {
    // Transforma os dados de entrada em uma instância do DTO
    const loginDto = plainToClass(LoginDto, { email, password });

    // Valida o DTO
    const errors = await validate(loginDto);

    if (errors.length > 0) {
      const messages = errors.map(error => Object.values(error.constraints)).flat();
      throw new Error(messages.join(', ')); // Agora segue a mesma abordagem que o CreateUserService
    }

    // Verifica se o usuário existe
    const user = await prismaClient.user.findFirst({
      where: {
        email: email,
      },
    });

    if (!user) {
      throw new Error("Email/Senha incorretos");
    }

    // Verifica se a senha está correta
    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) {
      throw new Error("Email/Senha incorretos");
    }

    // Gera o token
    const token = sign(
      {
        name: user.name,
        email: user.email,
      },
      "4f93ac9d10cb751b8c9c646bc9dbccb9", // Lembre-se de manter sua chave secreta em uma variável de ambiente
      {
        subject: user.id,
        expiresIn: '30d',
      }
    );

    return {
      id: user.id,
      name: user.name,
      token: token,
    };
  }
}

export { AuthUserService };
