import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { OrmModule } from 'src/libs/modules/database/typeorm.database';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV || 'development'}`,
    }),
    OrmModule,
    UsersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
