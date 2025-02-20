import { User } from '@core/domain/user/entity/User';
import { TypeOrmUser } from '@infrastructure/persistence/typeorm/entity/user/TypeOrmUser';

export class TypeOrmUserMapper {
  public static toOrmEntity(domainUser: User): TypeOrmUser {
    const ormUser: TypeOrmUser = new TypeOrmUser();

    ormUser.id = domainUser.getId();
    ormUser.name = domainUser.getName();
    ormUser.email = domainUser.getEmail();
    ormUser.password = domainUser.getPassword();
    ormUser.phone = domainUser.getPhone();
    ormUser.address = domainUser.getAddress();
    ormUser.isVerified = domainUser.getIsVerified();
    ormUser.verifiedAt = domainUser.getVerifiedAt();

    ormUser.createdAt = domainUser.getCreatedAt();
    ormUser.editedAt = domainUser.getEditedAt();
    ormUser.removedAt = domainUser.getRemovedAt();

    return ormUser;
  }

  public static toOrmEntities(users: User[]): TypeOrmUser[] {
    return users.map((user) => this.toOrmEntity(user));
  }

  public static toDomainEntity(ormUser: TypeOrmUser): User {
    const domainUser: User = new User({
      id: ormUser.id,
      name: ormUser.name,
      email: ormUser.email,
      password: ormUser.password,
      phone: ormUser.phone,
      address: ormUser.address,
      isVerified: ormUser.isVerified,
      verifiedAt: ormUser.verifiedAt,
      createdAt: ormUser.createdAt,
      editedAt: ormUser.editedAt,
      removedAt: ormUser.removedAt,
    });

    return domainUser;
  }

  public static toDomainEntities(ormUsers: TypeOrmUser[]): User[] {
    return ormUsers.map((ormUser) => this.toDomainEntity(ormUser));
  }
}
