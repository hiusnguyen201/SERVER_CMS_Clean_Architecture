import { registerDecorator, ValidationArguments } from 'class-validator';
import { REGEX_PATTERNS } from './constant';

export function IsVietnamesePhoneNumber() {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'isVietnamesePhoneNumber',
      target: object.constructor,
      propertyName: propertyName,
      validator: {
        validate(value: any, args: ValidationArguments) {
          return REGEX_PATTERNS.VIETNAMESE_PHONE_NUMBER.test(value);
        },
        defaultMessage(args: ValidationArguments) {
          return `${args.property} must be vietnamese phone number`;
        },
      },
    });
  };
}
