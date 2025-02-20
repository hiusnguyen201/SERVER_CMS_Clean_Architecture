import Redis from 'ioredis';
import { DatabaseConfig } from '@infrastructure/config/DatabaseConfig';
import { TypeOrmDirectory } from '@infrastructure/persistence/typeorm/TypeOrmDirectory';
import { Module, OnApplicationBootstrap, Provider } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MemoryCacheConfig } from '@infrastructure/config/MemoryCacheConfig';
import { RedisDITokens } from '@infrastructure/persistence/redis/di/RedisDITokens';
import { initializeTransactionalContext } from 'typeorm-transactional-cls-hooked';
import { APP_FILTER } from '@nestjs/core';
import { HttpExceptionFilter } from '@app/api/http-rest/exception-filter/HttpExceptionFilter';

const providers: Provider[] = [
  {
    provide: APP_FILTER,
    useClass: HttpExceptionFilter,
  },
  {
    provide: RedisDITokens.RedisClient,
    useFactory: (): Redis => {
      return new Redis({
        host: MemoryCacheConfig.MEMORY_CACHE_HOST,
        port: MemoryCacheConfig.MEMORY_CACHE_PORT,
        name: MemoryCacheConfig.MEMORY_CACHE_NAME,
        username: MemoryCacheConfig.MEMORY_CACHE_USERNAME,
        password: MemoryCacheConfig.MEMORY_CACHE_PASSWORD,
        keepAlive: MemoryCacheConfig.MEMORY_CACHE_KEEP_ALIVE,
      });
    },
  },
];

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: DatabaseConfig.DB_HOST,
      port: DatabaseConfig.DB_PORT,
      username: DatabaseConfig.DB_USERNAME,
      password: DatabaseConfig.DB_PASSWORD,
      database: DatabaseConfig.DB_NAME,
      logging: DatabaseConfig.DB_LOG_ENABLE,
      synchronize: true,
      autoLoadEntities: true,
      entities: [`${TypeOrmDirectory}/entity/**/*.{ts,js}`],
      migrations: [`${TypeOrmDirectory}/migration/**/*.{ts,js}`],
    }),
  ],
  providers: providers,
})
export class InfrastructureModule implements OnApplicationBootstrap {
  onApplicationBootstrap(): void {
    initializeTransactionalContext();
  }
}
