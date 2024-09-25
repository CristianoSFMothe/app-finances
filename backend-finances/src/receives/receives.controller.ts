import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ReceivesService } from './receives.service';
import { CreateReceiveDto } from './dto/create-receives.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Receitas')
@UseGuards(JwtAuthGuard)
@Controller('receives')
export class ReceivesController {
  constructor(private readonly receivesService: ReceivesService) {}

  @Post()
  async create(@Body() data: CreateReceiveDto) {
    return this.receivesService.createReceive(data);
  }

  @Get()
  listReceives(@Query('user_id') user_id: string, @Query('date') date: string) {
    return this.receivesService.listReceives(user_id, date);
  }

  @Get('all')
  listAllReceives() {
    return this.receivesService.listAllReceives();
  }

  @Get(':id')
  getReceiveById(@Param('id') id: string) {
    return this.receivesService.getReceiveById(id);
  }

  @Patch(':id')
  updateReceive(
    @Param('id') id: string,
    @Body() data: Partial<CreateReceiveDto>,
  ) {
    return this.receivesService.updateReceive(id, data);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.receivesService.deleteReceive(id);
  }
}
