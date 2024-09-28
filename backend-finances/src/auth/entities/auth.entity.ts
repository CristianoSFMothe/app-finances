import { ApiProperty } from '@nestjs/swagger';

export class AuthEntity {
  @ApiProperty()
  token: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  id: string;

  @ApiProperty()
  balance: number;
}
