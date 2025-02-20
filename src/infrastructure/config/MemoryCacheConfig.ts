import { get } from 'env-var';

export class MemoryCacheConfig {
  public static readonly MEMORY_CACHE_HOST: string = get('MEMORY_CACHE_HOST').required().asString();

  public static readonly MEMORY_CACHE_PORT: number = get('MEMORY_CACHE_PORT').required().asPortNumber();

  public static readonly MEMORY_CACHE_NAME: string = get('MEMORY_CACHE_NAME').required().asString();

  public static readonly MEMORY_CACHE_USERNAME: string = get('MEMORY_CACHE_USERNAME').required().asString();

  public static readonly MEMORY_CACHE_PASSWORD: string = get('MEMORY_CACHE_PASSWORD').required().asString();

  public static readonly MEMORY_CACHE_KEEP_ALIVE: number = get('MEMORY_CACHE_KEEP_ALIVE').required().asIntPositive();
}
