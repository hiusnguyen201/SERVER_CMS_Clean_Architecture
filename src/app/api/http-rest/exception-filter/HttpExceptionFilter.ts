import { CoreApiResponse } from '@core/common/api/CoreApiResponse';
import { Code } from '@core/common/code/Code';
import { Exception } from '@core/common/exception/Exception';
import { ApiServerConfig } from '@infrastructure/config/ApiServerConfig';
import { ArgumentsHost, Catch, ExceptionFilter, HttpException, Logger, UnauthorizedException } from '@nestjs/common';
import { Request, Response } from 'express';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  public catch(error: Error, host: ArgumentsHost) {
    const request: Request = host.switchToHttp().getRequest();
    const response: Response = host.switchToHttp().getResponse<Response>();

    let errorResponse: CoreApiResponse<unknown> = CoreApiResponse.error(Code.INTERNAL_SERVER_ERROR.code, error.message);

    errorResponse = this.handleNestError(error, errorResponse);
    errorResponse = this.handleCoreException(error, errorResponse);

    if (ApiServerConfig.LOG_ENABLE) {
      const message: string = `[HTTP_REQUEST] ${request.method} ${request.path}: ${errorResponse.message}`;
      Logger.error(message);
    }

    response.status(Math.floor(errorResponse.code / 100)).json(errorResponse);
  }

  private handleNestError(error: Error, errorResponse: CoreApiResponse<unknown>) {
    if (error instanceof HttpException) {
      errorResponse = CoreApiResponse.error(error.getStatus(), error.message, null);
    }

    if (error instanceof UnauthorizedException) {
      errorResponse = CoreApiResponse.error(Code.UNAUTHORIZED.code, Code.UNAUTHORIZED.message, null);
    }

    return errorResponse;
  }

  private handleCoreException(error: Error, errorResponse: CoreApiResponse<unknown>) {
    if (error instanceof Exception) {
      errorResponse = CoreApiResponse.error(error.code, error.message, error.data);
    }

    return errorResponse;
  }
}
