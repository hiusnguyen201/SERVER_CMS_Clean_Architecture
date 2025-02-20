import { Nullable } from '@core/common/type/CommonTypes';
import { User } from '@core/domain/user/entity/User';
import { TypeOrmUser } from '@infrastructure/persistence/typeorm/entity/user/TypeOrmUser';
import { FindManyOptions, FindOneOptions } from 'typeorm';

export interface UserRepositoryPort {
  findUser(options: FindOneOptions<TypeOrmUser>): Promise<Nullable<User>>;

  findUsers(options: FindManyOptions<TypeOrmUser>): Promise<User[]>;

  countUsers(options: FindManyOptions<TypeOrmUser>): Promise<number>;

  addUser(user: User): Promise<{ id: string }>;

  updateUser(user: User): Promise<void>;
}
