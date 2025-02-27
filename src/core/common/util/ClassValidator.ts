import { validate } from 'class-validator';
import { Nullable } from '@core/common/type/CommonTypes';

export class ClassValidator {
  public static async validate(object: object): Promise<Nullable<string[]>> {
    let error = null;
    const details = await validate(object);
    if (details.length) {
      error = details.map((err) => Object.values(err.constraints)[0]);
    }
    return error;
  }
}
