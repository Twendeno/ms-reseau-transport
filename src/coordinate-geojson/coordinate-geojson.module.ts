import { Module } from '@nestjs/common';
import { CoordinateGeojsonController } from './coordinate-geojson.controller';
import { CoordinateGeojsonService } from './coordinate-geojson.service';
import { CacheInterceptor, CacheModule } from '@nestjs/cache-manager';
import { APP_INTERCEPTOR } from '@nestjs/core';

@Module({
  controllers: [CoordinateGeojsonController],
  providers: [
    CoordinateGeojsonService,
    {
      provide: APP_INTERCEPTOR,
      useClass: CacheInterceptor,
    },
  ],
  imports: [CacheModule.register()],
})
export class CoordinateGeojsonModule {}
