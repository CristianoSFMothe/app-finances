import { ApiProperty } from '@nestjs/swagger';
import { Receive } from '@prisma/client';

export class ReceiveEntity implements Receive {
  @ApiProperty()
  id: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  value: number;

  @ApiProperty()
  type: string;

  @ApiProperty()
  date: string;

  @ApiProperty()
  user_id: string;

  @ApiProperty()
  created_at: Date;

  @ApiProperty()
  updated_at: Date;
}
