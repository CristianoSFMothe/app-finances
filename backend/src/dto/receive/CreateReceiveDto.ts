import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateReceiveDto {
  @IsNotEmpty({ message: 'O campo descrição é obrigatório.'})
  @IsString({ message: 'O campo descrição deve ser uma string.'})
  description: string;

  @IsNotEmpty({ message: 'O campo valor é obrigatório.'})
  @IsNumber({}, { message: 'Não é um número válido.'})
  value: number;

  @IsNotEmpty({ message: 'O campo tipo é obrigatório.'})
  @IsString({ message: 'O campo tipo deve ser uma string'})
  type: string;

  @IsNotEmpty({ message: 'O campo data é obrigatório.'})
  @IsString({ message: 'O campo data deve ser uma string'})
  date: string;

  @IsNotEmpty({ message: 'O campo user_id é obrigatório.'})
  @IsString({ message: 'O campo user_id deve ser uma string'})
  user_id: string;
}