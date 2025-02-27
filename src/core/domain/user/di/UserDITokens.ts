export class UserDITokens {
  public static readonly CreateUserUseCase: unique symbol = Symbol('CreateUserUseCase');
  public static readonly GetUserUseCase: unique symbol = Symbol('GetUserUseCase');
  public static readonly GetUsersUseCase: unique symbol = Symbol('GetUsersUseCase');
  public static readonly EditUserUseCase: unique symbol = Symbol('EditUserUseCase');
  public static readonly RemoveUserUseCase: unique symbol = Symbol('RemoveUserUseCase');

  public static readonly UserRepository: unique symbol = Symbol('UserRepository');

  public static readonly SendUserPasswordService: unique symbol = Symbol('SendUserPasswordService');
}
