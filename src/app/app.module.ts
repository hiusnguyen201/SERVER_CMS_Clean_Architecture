import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { PostgresDbModule } from 'src/libs/modules/database/postgres.database';
import { RedisModule } from 'src/libs/modules/redis/redis.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV || 'development'}`,
    }),
    PostgresDbModule,
    RedisModule,
    UsersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
