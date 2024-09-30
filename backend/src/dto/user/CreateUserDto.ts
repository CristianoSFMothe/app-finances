import { IsEmail, IsNotEmpty, validate } from 'class-validator';
import { plainToClass } from 'class-transformer';

export class CreateUserDto {
  @IsNotEmpty({ message: 'O campo nome é obrigatório.' })
  name: string;

  @IsEmail({}, { message: 'O e-mail fornecido não é válido.' })
  email: string;

  @IsNotEmpty({ message: 'A senha é obrigatória.' })
  password: string;
}
