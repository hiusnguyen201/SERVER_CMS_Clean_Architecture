import { ApiProperty } from '@nestjs/swagger';

export class HttpRestApiModelCreateUserBody {
  @ApiProperty()
  name: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  phone: string;

  @ApiProperty()
  address: string;

  @ApiProperty()
  typeId: string;
}
