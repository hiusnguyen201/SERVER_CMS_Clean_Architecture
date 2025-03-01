import { UseCaseValidatableAdapter } from '@core/common/adapter/UseCaseValidatableAdapter';
import { CreateUserPort } from '@core/domain/user/port/usecase/CreateUserPort';
import { Exclude, Expose, plainToClass } from 'class-transformer';
import { IsOptional, IsPhoneNumber, IsString } from 'class-validator';

@Exclude()
export class CreateUserAdapter extends UseCaseValidatableAdapter {
  @Expose()
  @IsString()
  public name: string;

  @Expose()
  @IsString()
  public email: string;

  @Expose()
  @IsString()
  @IsPhoneNumber('VN', { message: 'phone must be a valid vietnamese phone number' })
  public phone: string;

  @Expose()
  @IsOptional()
  @IsString()
  public address: string;

  public static async new(payload: CreateUserPort) {
    const adapter: CreateUserAdapter = plainToClass(CreateUserAdapter, payload);
    await adapter.validate();
    return adapter;
  }
}
