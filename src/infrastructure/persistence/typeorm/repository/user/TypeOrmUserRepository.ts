import { DataSource, FindManyOptions, FindOneOptions, FindOptionsWhere, InsertResult, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { UserRepositoryPort } from '@core/domain/user/port/repository/UserRepositoryPort';
import { Nullable } from '@core/common/type/CommonTypes';
import { User } from '@core/domain/user/entity/User';
import { TypeOrmUser } from '@infrastructure/persistence/typeorm/entity/user/TypeOrmUser';
import { TypeOrmUserMapper } from '@infrastructure/persistence/typeorm/entity/user/mapper/TypeOrmUserMapper';

@Injectable()
export class TypeOrmUserRepository extends Repository<TypeOrmUser> implements UserRepositoryPort {
  constructor(@InjectDataSource() dataSource: DataSource) {
    super(TypeOrmUser, dataSource.createEntityManager());
  }

  public async findUser(options: FindOneOptions<TypeOrmUser>): Promise<Nullable<User>> {
    let domainEntity: Nullable<User> = null;

    const ormUser = await this.findOne(options);
    if (ormUser) {
      domainEntity = TypeOrmUserMapper.toDomainEntity(ormUser);
    }

    return domainEntity;
  }

  public async findUsers(options: FindManyOptions<TypeOrmUser>): Promise<User[]> {
    let domainEntities: User[] = [];

    const ormUsers = await this.find(options);
    if (ormUsers.length > 0) {
      domainEntities = TypeOrmUserMapper.toDomainEntities(ormUsers);
    }

    return domainEntities;
  }

  public async countUsers(options: FindManyOptions<TypeOrmUser>): Promise<number> {
    return this.count(options);
  }

  public async addUser(user: User): Promise<{ id: string }> {
    const ormUser: TypeOrmUser = TypeOrmUserMapper.toOrmEntity(user);

    const insertResult: InsertResult = await this.insert(ormUser);

    return {
      id: insertResult.identifiers[0].id,
    };
  }

  public async updateUser(user: User): Promise<void> {
    const ormUser: TypeOrmUser = TypeOrmUserMapper.toOrmEntity(user);
    await this.update(ormUser.id, ormUser);
  }

  public async existUser(where: FindOptionsWhere<TypeOrmUser>): Promise<boolean> {
    return this.existsBy(where);
  }
}
