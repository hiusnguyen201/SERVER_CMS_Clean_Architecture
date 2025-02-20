import { Code } from '@core/common/code/Code';
import { Optional } from '@core/common/type/CommonTypes';

export class CoreApiResponse<TData> {
  public readonly code: number;

  public readonly reason?: Optional<string>;

  public readonly message: string;

  public readonly timestamp: number;

  public readonly data: Optional<TData>;

  private constructor(code: number, message: string, data?: TData) {
    this.code = code;
    this.message = message;
    this.data = data;
    this.timestamp = Date.now();
  }

  public static success<TData>(data?: TData, message?: string): CoreApiResponse<TData> {
    const resultCode = Code.SUCCESS.code;
    const resultMessage = message || Code.SUCCESS.message;
    return new CoreApiResponse(resultCode, resultMessage, data);
  }

  public static error<TData>(code?: number, message?: string, data?: TData): CoreApiResponse<TData> {
    const resultCode = code || Code.INTERNAL_SERVER_ERROR.code;
    const resultMessage = message || Code.INTERNAL_SERVER_ERROR.message;
    return new CoreApiResponse(resultCode, resultMessage, data);
  }
}
