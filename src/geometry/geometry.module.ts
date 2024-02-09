import { Module } from '@nestjs/common';
import { GeometryController } from './geometry.controller';
import { GeometryService } from './geometry.service';
import { CacheInterceptor, CacheModule } from '@nestjs/cache-manager';
import { APP_INTERCEPTOR } from '@nestjs/core';

@Module({
  controllers: [GeometryController],
  imports: [CacheModule.register()],
  providers: [
    GeometryService,
    {
      provide: APP_INTERCEPTOR,
      useClass: CacheInterceptor,
    },
  ],
})
export class GeometryModule {}
