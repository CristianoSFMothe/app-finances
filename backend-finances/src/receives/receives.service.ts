import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateReceiveDto } from './dto/create-receives.dto';
import { UsersService } from 'src/users/users.service';
import { ReceiveEntity } from './entities/receives.entity';

@Injectable()
export class ReceivesService {
  constructor(
    private prisma: PrismaService,
    private usersService: UsersService,
  ) {}

  async createReceive(data: CreateReceiveDto): Promise<ReceiveEntity> {
    const { user_id, value, type } = data;

    const findUser = await this.usersService.getUserById(user_id);

    if (type === 'receita') {
      await this.prisma.user.update({
        where: {
          id: user_id,
        },
        data: {
          balance: findUser.balance + Number(value),
        },
      });
    } else {
      await this.prisma.user.update({
        where: {
          id: user_id,
        },
        data: {
          balance: findUser.balance - Number(value),
        },
      });
    }

    const newReceive = await this.prisma.receive.create({
      data: {
        description: data.description,
        type: data.type,
        value: data.value,
        date: data.date,
        user_id: data.user_id,
      },
    });

    return newReceive as ReceiveEntity;
  }
}
