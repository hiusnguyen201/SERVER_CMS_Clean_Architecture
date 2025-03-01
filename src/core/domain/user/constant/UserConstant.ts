export class UserConstant {
  public static DEFAULT_RANDOM_PASSWORD_LENGTH: number = 10;
  public static MAX_LOGIN_ATTEMPTS: number = 3;
}

export enum USER_TYPE {
  USER = 'User',
  CUSTOMER = 'Customer',
}
