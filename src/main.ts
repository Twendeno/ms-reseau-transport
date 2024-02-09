import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import * as process from 'process';
import helmet from 'helmet';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as fs from 'fs';
import * as path from 'path';
import { json, urlencoded } from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '1',
  });

  app.useGlobalPipes(new ValidationPipe()); // 👈
  app.use(helmet());
  app.enableCors();

  app.use(json({ limit: '50mb' }));
  app.use(urlencoded({ extended: true, limit: '50mb' }));

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

  await app.listen(process.env.PORT);
}
bootstrap();
