import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class LoginDto {
  @IsNotEmpty({ message: 'O campo e-mail é obrigatório.' })
  @IsEmail({}, { message: 'O e-mail fornecido não é válido.' })
  email: string;

  @IsNotEmpty({ message: 'A senha é obrigatória.' })
  @IsString({ message: 'O campo senha deve ser uma string.' }) 
  password: string;
}