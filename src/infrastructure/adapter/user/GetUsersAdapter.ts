import { UseCaseValidatableAdapter } from '@core/common/adapter/UseCaseValidatableAdapter';
import { GetUsersPort } from '@core/domain/user/port/usecase/GetUsersPort';
import { Exclude, Expose, plainToClass, Transform } from 'class-transformer';
import { IsBoolean, IsIn, IsNumber, IsOptional, IsString, Max, Min } from 'class-validator';

@Exclude()
export class GetUsersAdapter extends UseCaseValidatableAdapter {
  @Expose()
  @IsOptional()
  @IsString()
  @Transform(({ value }) => (value === undefined ? '' : value), { toClassOnly: true })
  public keyword: string = '';

  @Expose()
  @IsOptional()
  @IsNumber()
  @Transform(({ value }) => (value === undefined ? 10 : Number(value)), { toClassOnly: true })
  @Min(10)
  @Max(100)
  public limit: number = 10;

  @Expose()
  @IsOptional()
  @IsNumber()
  @Transform(({ value }) => (value === undefined ? 1 : Number(value)), { toClassOnly: true })
  @Min(1)
  public page: number = 1;

  @Expose()
  @IsOptional()
  @IsString()
  @Transform(({ value }) => (value === undefined ? 'createdAt' : value), { toClassOnly: true })
  @IsIn(['name', 'email', 'phone', 'createdAt'])
  public sortBy: string = 'createdAt';

  @Expose()
  @IsOptional()
  @IsString()
  @Transform(({ value }) => (value === undefined ? 'desc' : value), { toClassOnly: true })
  @IsIn(['asc', 'desc', 'ASC', 'DESC'])
  public sortOrder: string = 'desc';

  @Expose()
  @IsOptional()
  @IsBoolean()
  public isVerified: boolean;

  public static async new(payload: GetUsersPort) {
    const adapter: GetUsersAdapter = plainToClass(GetUsersAdapter, payload);
    await adapter.validate();
    return adapter;
  }
}
