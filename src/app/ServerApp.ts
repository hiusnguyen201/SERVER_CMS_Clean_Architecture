import * as compression from 'compression';
import helmet from 'helmet';
import { NestFactory } from '@nestjs/core';
import { ApiServerConfig } from '@infrastructure/config/ApiServerConfig';
import { AppModule } from '@app/di/AppModule';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export class ServerApp {
  private readonly host: string = ApiServerConfig.API_HOST;

  private readonly port: number = ApiServerConfig.API_PORT;

  public async run(): Promise<void> {
    const app: NestExpressApplication = await NestFactory.create<NestExpressApplication>(AppModule);

    app.setGlobalPrefix('api');
    app.enableCors();
    app.use(compression());
    app.use(helmet());

    this.log();
    this.buildApiDocumentation(app);

    await app.listen(this.port, this.host);
  }

  public buildApiDocumentation(app: NestExpressApplication): void {
    const title = 'CMS - Classroom management system';
    const description = 'CMS API Documentation';
    const config = new DocumentBuilder().setTitle(title).setDescription(description).setVersion('1.0').build();
    const documentFactory = () => SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, documentFactory);
  }

  private log(): void {
    console.log(`Server started on host: ${this.host}; port: ${this.port}`);
  }

  public static new() {
    return new ServerApp();
  }
}
