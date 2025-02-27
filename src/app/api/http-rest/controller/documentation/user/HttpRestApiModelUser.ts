import { ApiProperty } from '@nestjs/swagger';

export class HttpRestApiModelUser {
  @ApiProperty()
  public id: string;

  @ApiProperty()
  public name: string;

  @ApiProperty()
  public email: string;

  @ApiProperty()
  public phone: string;

  @ApiProperty()
  public address: string;

  @ApiProperty()
  public isVerified: boolean;

  @ApiProperty()
  public typeId: string;

  @ApiProperty()
  public createdAt: Date;

  @ApiProperty()
  public editedAt: Date;
}
