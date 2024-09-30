import { hash } from "bcryptjs";
import { validate } from "class-validator";
import { plainToClass } from "class-transformer";
import prismaClient from "../../prisma";
import { CreateUserDto } from "../../dto/user/CreateUserDto";

interface UserRequest {
  name: string;
  email: string;
  password: string;
  balance?: number;
}

class CreateUserService {
  async execute({ name, email, password, balance = 0 }: UserRequest) {
    const userDto = plainToClass(CreateUserDto, { name, email, password });

    const errors = await validate(userDto);

    if (errors.length > 0) {
      const messages = errors
        .map((error) => Object.values(error.constraints))
        .flat();
      throw new Error(messages.join(", "));
    }

    const userAlreadyExists = await prismaClient.user.findFirst({
      where: {
        email: email,
      },
    });

    if (userAlreadyExists) {
      throw new Error("Usuário já existe.");
    }

    const passwordHash = await hash(password, 8);

    const user = await prismaClient.user.create({
      data: {
        name: name,
        email: email,
        password: passwordHash,
        balance,
      },
      select: {
        id: true,
        name: true,
        email: true,
        balance: true,
        created_at: true,
        updated_at: true,
      },
    });

    return user;
  }
}

export { CreateUserService };
