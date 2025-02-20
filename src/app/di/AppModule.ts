import { Module } from '@nestjs/common';
import { InfrastructureModule } from '@app/di/InfrastructureModule';
import { UserModule } from '@app/di/UserModule';

@Module({
  imports: [InfrastructureModule, UserModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
