import { Exception } from '@core/common/exception/Exception';
import { Code } from '@core/common/code/Code';
import { ClassValidator } from '@core/common/util/ClassValidator';
import { Nullable } from '@core/common/type/CommonTypes';

export class UseCaseValidatableAdapter {
  public async validate() {
    const errors: Nullable<string[]> = await ClassValidator.validate(this);
    if (errors) {
      throw Exception.new({ code: Code.USE_CASE_PORT_VALIDATION_ERROR, data: errors });
    }
  }
}
