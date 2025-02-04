import {
  IsString,
  IsEmail,
  IsNotEmpty,
  MaxLength,
  IsOptional,
  MinLength,
} from 'class-validator';
import { IsPhoneNumber } from 'src/libs/validators/phone-number.validator';
import { PHONE_NUMBER_PATTERNS } from 'src/libs/constant/regex-pattern.constant';

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
  @IsPhoneNumber(PHONE_NUMBER_PATTERNS.VIETNAMESE)
  phone: string;

  @IsOptional()
  @IsString()
  @MaxLength(200)
  address: string;
}
