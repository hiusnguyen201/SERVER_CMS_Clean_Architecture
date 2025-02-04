import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        type: 'postgres',
        host: process.env.DATABASE_HOST || 'localhost',
        port: Number(process.env.DATABASE_PORT) || 5432,
        username: process.env.DATABASE_USER || 'postgres',
        password: process.env.DATABASE_PASS || 'postgres',
        database: process.env.DATABASE_NAME || 'postgres',
        synchronize: true,
        entities: [`${__dirname}/**/*.entity.{ts,js}`],
        logging: true,
        migrations: ['src/db/migrations/**/*.migration{.ts,.js}'],
        autoLoadEntities: true,
        timezone: 'Asia/Ho_Chi_Minh',
      }),
    }),
  ],
})
export class PostgresDbModule {}
