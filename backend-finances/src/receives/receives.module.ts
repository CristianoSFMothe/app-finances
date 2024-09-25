// src/receives/receives.module.ts

import { Module } from '@nestjs/common';
import { ReceivesController } from './receives.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { ReceivesService } from './receives.service';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [PrismaModule, UsersModule],
  controllers: [ReceivesController],
  providers: [ReceivesService],
})
export class ReceivesModule {}
