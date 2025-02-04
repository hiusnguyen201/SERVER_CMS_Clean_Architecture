import Redis, { RedisOptions } from 'ioredis';
import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { RedisService } from './redis.service';

@Module({
  providers: [
    {
      provide: 'REDIS_CLIENT',
      inject: [ConfigService],
      useFactory: async () => {
        return new Redis({
          name: process.env.REDIS_NAME,
          host: process.env.REDIS_HOST,
          port: Number(process.env.REDIS_PORT),
          username: process.env.REDIS_USER,
          password: process.env.REDIS_PASSWORD,
          keepAlive: Number(process.env.REDIS_KEEP_ALIVE) || 10000, // Every 10 seconds send PING
        } as RedisOptions);
      },
    },
    RedisService,
  ],
  exports: ['REDIS_CLIENT', RedisService],
})
export class RedisModule {}
