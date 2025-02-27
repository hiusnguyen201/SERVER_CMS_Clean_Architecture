import { IsDate, IsOptional, ValidationError } from 'class-validator';
import { Nullable } from '@core/common/type/CommonTypes';
import { Exception } from '@core/common/exception/Exception';
import { Code } from '@core/common/code/Code';
import { ClassValidator } from '@core/common/util/ClassValidator';

export class Entity<TIdentify extends number | string> {
  protected id: TIdentify;

  @IsDate()
  protected createdAt: Date;

  @IsOptional()
  @IsDate()
  protected editedAt: Nullable<Date>;

  public getId() {
    if (!this.id) {
      throw Exception.new({
        code: Code.ENTITY_VALIDATION_ERROR,
        overrideMessage: `${this.constructor.name}: Id is empty`,
      });
    }

    return this.id;
  }

  public getCreatedAt() {
    if (!this.createdAt) {
      throw Exception.new({
        code: Code.ENTITY_VALIDATION_ERROR,
        overrideMessage: `${this.constructor.name}: CreatedAt is empty`,
      });
    }

    return this.createdAt;
  }

  public getEditedAt() {
    return this.editedAt;
  }

  public async validate(): Promise<void> {
    const errors: Nullable<string[]> = await ClassValidator.validate(this);
    if (errors) {
      throw Exception.new({ code: Code.ENTITY_VALIDATION_ERROR, data: errors });
    }
  }
}
