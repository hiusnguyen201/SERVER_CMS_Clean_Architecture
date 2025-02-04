import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
} from 'class-validator';

export function IsPhoneNumber(
  regexp: RegExp,
  validationsOptions?: ValidationOptions,
): PropertyDecorator {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'isPhoneNumber',
      target: object.constructor,
      options: validationsOptions,
      propertyName: propertyName,
      validator: {
        validate(value: any, args: ValidationArguments) {
          return regexp.test(value);
        },
        defaultMessage(args: ValidationArguments) {
          return `${args.property} must be valid phone number`;
        },
      },
    });
  };
}
