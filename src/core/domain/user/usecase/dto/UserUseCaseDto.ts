import { Exclude, Expose, plainToClass } from 'class-transformer';
import { User } from '@core/domain/user/entity/User';

@Exclude()
export class UserUseCaseDto {
  @Expose()
  public id: string;

  @Expose()
  public name: string;

  @Expose()
  public email: string;

  @Expose()
  public phone: string;

  @Expose()
  public address: string;

  @Expose()
  public isVerified: boolean;

  @Expose()
  public createdAt: Date;

  @Expose()
  public editedAt: Date;

  public static newFromUser(user: User): UserUseCaseDto {
    return plainToClass(UserUseCaseDto, user);
  }

  public static newListFromUsers(users: User[]): UserUseCaseDto[] {
    return users.map((user) => this.newFromUser(user));
  }
}
