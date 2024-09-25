import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './users/users.module';
import { ReceivesModule } from './receives/receives.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [PrismaModule, UsersModule, ReceivesModule, AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
