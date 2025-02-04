import { PartialType } from '@nestjs/mapped-types';
import { IsOptional, IsString } from 'class-validator';
import { PaginationRequestDto } from 'src/libs/dtos/pagination-request.dto';

export class GetUsersDto extends PartialType(PaginationRequestDto) {
  @IsOptional()
  @IsString()
  keyword: string;
}
