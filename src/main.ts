import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import * as process from 'process';
import helmet from 'helmet';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as fs from 'fs';
import * as path from 'path';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '1',
  });

  app.useGlobalPipes(new ValidationPipe()); // 👈
  app.use(helmet());
  app.enableCors();

  // Récupérer la version depuis package.json
  const packageJsonPath = path.resolve(__dirname, '..', 'package.json');
  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'));

  const appVersion = packageJson.version;
  const appName = packageJson.name.toUpperCase();
  const appDescription = packageJson.description;
  const appAuthor = packageJson.author;
  const appLicense = packageJson.license;

  // Configuration de Swagger
  const config = new DocumentBuilder()
    .setTitle(appName)
    .setContact(appAuthor, 'https://www.twendeno.com', 'mbote@twendeno.com')
    .setLicense(appLicense, '')
    .setDescription(appDescription)
    .setVersion(appVersion)
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('api-docs', app, document);

  // Redirection vers Swagger lorsque l'utilisateur accède à la racine
  app.useGlobalFilters({
    async catch(_, host) {
      const ctx = host.switchToHttp();
      const response = ctx.getResponse();
      response.redirect('/api-docs');
    },
  });

  await app.listen(process.env.PORT);
}

bootstrap();
