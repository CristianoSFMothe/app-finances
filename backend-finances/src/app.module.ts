import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './users/users.module';
import { ReceivesModule } from './receives/receives.module';

@Module({
  imports: [PrismaModule, UsersModule, ReceivesModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
