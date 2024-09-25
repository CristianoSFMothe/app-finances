import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateReceiveDto } from './dto/create-receives.dto';
import { UsersService } from 'src/users/users.service';
import { ReceiveEntity } from './entities/receives.entity';
import { TransactionType } from './transaction-type.enum';

@Injectable()
export class ReceivesService {
  constructor(
    private prisma: PrismaService,
    private usersService: UsersService,
  ) {}

  async createReceive(data: CreateReceiveDto): Promise<ReceiveEntity> {
    const { user_id, value, type } = data;

    const findUser = await this.usersService.getUserById(user_id);

    let newBalance: number;

    if (type === TransactionType.INCOME) {
      newBalance = findUser.balance + Number(value);
    } else if (type === TransactionType.EXPENSE) {
      newBalance = findUser.balance - Number(value);
    } else {
      throw new BadRequestException('Tipo de transação inválido');
    }

    // Create the new receive
    const newReceive = await this.prisma.receive.create({
      data: {
        description: data.description,
        type: data.type,
        value: data.value,
        date: data.date,
        user_id: data.user_id,
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });

    await this.prisma.user.update({
      where: {
        id: user_id,
      },
      data: {
        balance: newBalance,
      },
    });

    return newReceive;
  }

  async listReceives(user_id: string, date: string) {
    const receives = await this.prisma.receive.findMany({
      where: {
        date: date,
        user_id: user_id,
      },
      select: {
        id: true,
        description: true,
        value: true,
        type: true,
        date: true,
        created_at: true,
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
      orderBy: {
        created_at: 'desc',
      },
    });

    if (receives.length === 0) {
      throw new NotFoundException(
        'Nenhum recebimento encontrado para esta data.',
      );
    }

    return receives;
  }

  async listAllReceives() {
    const receives = await this.prisma.receive.findMany({
      select: {
        id: true,
        description: true,
        value: true,
        type: true,
        date: true,
        created_at: true,
        user_id: true,
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
      orderBy: {
        created_at: 'desc',
      },
    });

    return receives;
  }

  async getReceiveById(id: string) {
    const receive = await this.prisma.receive.findUnique({
      where: { id },
      select: {
        id: true,
        description: true,
        value: true,
        type: true,
        date: true,
        created_at: true,
        user_id: true,
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });

    if (!receive) {
      throw new NotFoundException('Recebimento não encontrado');
    }

    return receive;
  }

  async updateReceive(id: string, data: Partial<CreateReceiveDto>) {
    const existingReceive = await this.prisma.receive.findUnique({
      where: { id },
    });

    if (!existingReceive) {
      throw new NotFoundException('Recebimento não encontrado');
    }

    return this.prisma.receive.update({
      where: { id },
      data,
    });
  }

  async deleteReceive(id: string) {
    const receive = await this.prisma.receive.findUnique({
      where: { id },
    });

    if (!receive) {
      throw new NotFoundException('Receita não encontrada');
    }

    await this.prisma.receive.delete({
      where: { id },
    });

    return { message: 'Receita excluída com sucesso' };
  }
}
