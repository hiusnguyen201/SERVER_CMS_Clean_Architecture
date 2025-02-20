import * as compression from 'compression';
import helmet from 'helmet';
import { NestFactory } from '@nestjs/core';
import { ApiServerConfig } from '@infrastructure/config/ApiServerConfig';
import { AppModule } from '@app/di/AppModule';
import { NestExpressApplication } from '@nestjs/platform-express';

export class ServerApp {
  private readonly host: string = ApiServerConfig.API_HOST;

  private readonly port: number = ApiServerConfig.API_PORT;

  public async run(): Promise<void> {
    const app = await NestFactory.create<NestExpressApplication>(AppModule);

    app.setGlobalPrefix('api');
    app.enableCors();
    app.use(compression());
    app.use(helmet());

    this.log();

    await app.listen(this.port, this.host);
  }

  private log(): void {
    console.log(`Server started on host: ${this.host}; port: ${this.port}`);
  }

  public static new() {
    return new ServerApp();
  }
}
