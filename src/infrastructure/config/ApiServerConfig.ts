import { get } from 'env-var';

export class ApiServerConfig {
  public static readonly SERVER_NAME: string = get('SERVER_NAME').required().asString();

  public static readonly API_HOST: string = get('API_HOST').required().asString();

  public static readonly API_PORT: number = get('API_PORT').required().asPortNumber();

  public static readonly ACCESS_TOKEN_SECRET: string = get('ACCESS_TOKEN_SECRET').required().asString();

  public static readonly LOG_ENABLE: boolean = get('API_LOG_ENABLE').required().asBool();
}
