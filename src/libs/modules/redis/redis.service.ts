import { Inject, Injectable } from '@nestjs/common';
import Redis from 'ioredis';

@Injectable()
export class RedisService {
  constructor(@Inject('REDIS_CLIENT') private readonly redisClient: Redis) {}

  public async get<T>(key: string): Promise<T | null> {
    const value = await this.redisClient.get(key);
    return value ? (JSON.parse(value) as T) : null;
  }

  public async set(key: string, value: object | string | boolean | number, expire?: number): Promise<void> {
    const stringValue = typeof value === 'object' ? JSON.stringify(value) : String(value);

    if (expire) {
      await this.redisClient.set(key, stringValue, 'PX', expire); // milliseconds
    } else {
      await this.redisClient.set(key, stringValue);
    }
  }
}
