import { Entity } from '@core/common/entity/Entity';
import { RemovableEntity } from '@core/common/entity/RemovableEntity';
import { Nullable } from '@core/common/type/CommonTypes';
import { IsBoolean, IsDate, IsOptional, IsString } from 'class-validator';
import { CreateUserEntityPayload } from './type/CreateUserEntityPayload';
import { v4 } from 'uuid';
import { compare, genSalt, hash } from 'bcrypt';
import { EditUserEntityPayload } from './type/EditUserEntityPayload';

export class User extends Entity<string> implements RemovableEntity {
  @IsString()
  private name: string;

  @IsString()
  private readonly email: string;

  @IsString()
  private password: string;

  @IsOptional()
  @IsString()
  private phone: Nullable<string>;

  @IsOptional()
  @IsString()
  private address: Nullable<string>;

  @IsBoolean()
  private isVerified: boolean;

  @IsOptional()
  @IsDate()
  private verifiedAt: Nullable<Date>;

  @IsOptional()
  @IsDate()
  private removedAt: Nullable<Date>;

  constructor(payload: CreateUserEntityPayload) {
    super();
    this.id = payload.id || v4();
    this.name = payload.name;
    this.email = payload.email;
    this.password = payload.password;
    this.phone = payload.phone || null;
    this.address = payload.address || null;
    this.isVerified = payload.isVerified || false;
    this.verifiedAt = payload.verifiedAt || null;
    this.createdAt = payload.createdAt || new Date();
    this.editedAt = payload.editedAt || new Date();
    this.removedAt = payload.removedAt || null;
  }

  public getName() {
    return this.name;
  }

  public getEmail() {
    return this.email;
  }

  public getPassword() {
    return this.password;
  }

  public getPhone() {
    return this.phone;
  }

  public getAddress() {
    return this.address;
  }

  public getIsVerified() {
    return this.isVerified;
  }

  public getVerifiedAt() {
    return this.verifiedAt;
  }

  public getRemovedAt() {
    return this.removedAt;
  }

  private async hashPassword() {
    const salt: string = await genSalt();
    this.password = await hash(this.password, salt);
  }

  public async comparePassword(password: string): Promise<boolean> {
    return compare(password, this.password);
  }

  public static async new(payload: CreateUserEntityPayload): Promise<User> {
    const user = new User(payload);
    await user.hashPassword();
    await user.validate();
    return user;
  }

  public async edit(payload: EditUserEntityPayload): Promise<void> {
    const currentDate: Date = new Date();

    for (const [key, value] of Object.entries(payload)) {
      this[key] = value;
      this.editedAt = currentDate;
    }

    await this.validate();
  }

  public async remove(): Promise<void> {
    this.removedAt = new Date();
    await this.validate();
  }
}
