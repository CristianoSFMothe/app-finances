import { Body, Controller, Post } from '@nestjs/common';
import { ReceivesService } from './receives.service';
import { CreateReceiveDto } from './dto/create-receives.dto';

@Controller('receives')
export class ReceivesController {
  constructor(private readonly receivesService: ReceivesService) {}

  @Post()
  async create(@Body() data: CreateReceiveDto) {
    return this.receivesService.createReceive(data);
  }
}
