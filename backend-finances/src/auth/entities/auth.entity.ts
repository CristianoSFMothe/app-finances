import { ApiProperty } from '@nestjs/swagger';

export class AuthEntity {
  @ApiProperty()
  token: string;

  @ApiProperty()
  email: string;
}
