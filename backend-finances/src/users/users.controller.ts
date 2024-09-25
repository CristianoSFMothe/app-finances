import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() data: CreateUserDto) {
    return this.usersService.createUser(data);
  }

  @Get()
  async findAllUser() {
    return this.usersService.findAllUsers();
  }

  @Get(':id')
  async getById(@Param('id') id: string) {
    return this.usersService.getUserById(id);
  }

  @Get('email')
  getByEmail(@Query('email') email: string) {
    return this.usersService.getUserByEmail(email);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() data: Partial<CreateUserDto>) {
    return this.usersService.updateUser(id, data);
  }
}
