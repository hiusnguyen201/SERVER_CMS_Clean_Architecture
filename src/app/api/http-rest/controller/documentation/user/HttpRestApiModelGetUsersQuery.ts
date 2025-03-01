import { ApiProperty } from '@nestjs/swagger';

export class HttpRestApiModelGetUsersQuery {
  @ApiProperty({ type: 'number', required: false, minimum: 1 })
  public page: number;

  @ApiProperty({ type: 'number', required: false, minimum: 10, maximum: 100 })
  public limit: number;

  @ApiProperty({ type: 'string', required: false })
  public keyword: string;

  @ApiProperty({ type: 'string', required: false, enum: ['name', 'email', 'phone', 'createdAt'] })
  public sortBy: string;

  @ApiProperty({ type: 'string', required: false, enum: ['asc', 'desc', 'ASC', 'DESC'] })
  public sortOrder: string;

  @ApiProperty({ type: 'string', required: false, enum: ['unverified', 'verified'] })
  public status: string;
}
