import {
  IsString,
  IsEmail,
  IsNotEmpty,
  MaxLength,
  IsOptional,
  MinLength,
} from 'class-validator';
import { IsVietnamesePhoneNumber } from 'src/core/custom-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(4)
  @MaxLength(100)
  name: string;

  @IsNotEmpty()
  @IsEmail()
  @MaxLength(150)
  email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(4)
  @MaxLength(32)
  password: string;

  @IsOptional()
  @IsString()
  @MaxLength(15)
  @IsVietnamesePhoneNumber()
  phone: string;

  @IsOptional()
  @IsString()
  @MaxLength(200)
  address: string;
}
