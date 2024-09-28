import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from './../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { AuthEntity } from './entities/auth.entity';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async login(email: string, password: string): Promise<AuthEntity> {
    const user = await this.prisma.user.findUnique({
      where: {
        email: email,
      },
      select: {
        // Use select para escolher quais campos retornar
        id: true,
        name: true,
        email: true,
        password: true, // Inclua o password para validar, mas não retorne na resposta
        balance: true, // Inclua o balance na seleção
      },
    });

    console.log(user);

    if (!user) {
      throw new NotFoundException('Usuário ou senha inválidos.');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    console.log('Password valid:', isPasswordValid);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Usuário ou senha inválidos.');
    }

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      balance: user.balance, // Adicione o balance na resposta
      token: this.jwtService.sign({ userId: user.id }),
    };
  }
}
