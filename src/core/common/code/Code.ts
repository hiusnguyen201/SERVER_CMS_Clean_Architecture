export type CodeDescription = {
  code: number;
  message: string;
};

export class Code {
  public static SUCCESS: CodeDescription = {
    code: 200,
    message: 'Success',
  };

  public static BAD_REQUEST: CodeDescription = {
    code: 400,
    message: 'Bad request',
  };

  public static ENTITY_VALIDATION_ERROR: CodeDescription = {
    code: 400,
    message: 'Entity validation error',
  };

  public static USE_CASE_PORT_VALIDATION_ERROR: CodeDescription = {
    code: 400,
    message: 'Use-case port validation error',
  };

  public static UNAUTHORIZED: CodeDescription = {
    code: 401,
    message: 'Unauthorized',
  };

  public static WRONG_CREDENTIALS: CodeDescription = {
    code: 401,
    message: 'Wrong credentials',
  };

  public static ACCESS_DENIED: CodeDescription = {
    code: 403,
    message: 'Access denied',
  };

  public static ENTITY_NOT_FOUND: CodeDescription = {
    code: 404,
    message: 'Entity not found',
  };

  public static TEMPLATE_FILE_NOT_FOUND: CodeDescription = {
    code: 404,
    message: 'Template file not found',
  };

  public static ENTITY_ALREADY_EXISTS: CodeDescription = {
    code: 409,
    message: 'Entity already exists',
  };

  public static INTERNAL_SERVER_ERROR: CodeDescription = {
    code: 500,
    message: 'Internal server error',
  };
}
