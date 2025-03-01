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
  public createdAt: Date;

  @ApiProperty()
  public editedAt: Date;
}

export class HttpRestApiModelUsers {
  @ApiProperty()
  public totalCount: number;

  @ApiProperty({ type: [HttpRestApiModelUser] })
  public list: HttpRestApiModelUser[];
}
