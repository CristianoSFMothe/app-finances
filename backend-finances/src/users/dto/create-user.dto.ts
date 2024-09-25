import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Matches,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @IsString({ message: 'O nome inválido.' })
  @IsNotEmpty({ message: 'O nome não pode estar vazio.' })
  @ApiProperty()
  name: string;

  @IsString({ message: 'O email inválido.' })
  @IsNotEmpty({ message: 'O email não pode estar vazio.' })
  @IsEmail({}, { message: 'O email informado é inválido.' })
  @ApiProperty()
  email: string;

  @IsString({ message: 'A senha inválida.' })
  @IsNotEmpty({ message: 'A senha não pode estar vazia.' })
  @MinLength(6, { message: 'A senha deve ter no mínimo 6 caracteres.' })
  @Matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
    {
      message:
        'A senha deve conter pelo menos uma letra maiúscula, uma letra minúscula, um número e um caractere especial.',
    },
  )
  @ApiProperty()
  password: string;
}
