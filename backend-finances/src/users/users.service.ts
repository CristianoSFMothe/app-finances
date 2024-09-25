import { ConflictException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async createUser(data: CreateUserDto) {
    const emailExisting = await this.prisma.user.findFirst({
      where: { email: data.email },
    });

    if (emailExisting) {
      throw new ConflictException('Email já esta em uso');
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(data.password, saltRounds);

    return this.prisma.user.create({
      data: {
        ...data,
        password: hashedPassword,
        balance: 0,
      },
      select: {
        id: true,
        name: true,
        email: true,
        balance: true,
      },
    });
  }
}
