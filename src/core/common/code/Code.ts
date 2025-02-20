export type CodeDescription = {
  code: number;
  message: string;
};

export class Code {
  public static SUCCESS: CodeDescription = {
    code: 20001,
    message: 'Success',
  };

  public static BAD_REQUEST: CodeDescription = {
    code: 40001,
    message: 'Bad request',
  };

  public static ENTITY_VALIDATION_ERROR: CodeDescription = {
    code: 40002,
    message: 'Entity validation error',
  };

  public static UNAUTHORIZED: CodeDescription = {
    code: 40101,
    message: 'Unauthorized',
  };

  public static WRONG_CREDENTIALS: CodeDescription = {
    code: 40102,
    message: 'Wrong credentials',
  };

  public static ACCESS_DENIED: CodeDescription = {
    code: 40301,
    message: 'Access denied',
  };

  public static ENTITY_NOT_FOUND: CodeDescription = {
    code: 40401,
    message: 'Entity not found',
  };

  public static ENTITY_ALREADY_EXISTS: CodeDescription = {
    code: 40901,
    message: 'Entity already exists',
  };

  public static INTERNAL_SERVER_ERROR: CodeDescription = {
    code: 50001,
    message: 'Internal server error',
  };
}
