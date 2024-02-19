import { Module } from '@nestjs/common';
import { CoordinateController } from './coordinate.controller';
import { CoordinateService } from './coordinate.service';
import { CacheInterceptor, CacheModule } from '@nestjs/cache-manager';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { CoordinatePolygonService } from '../coordinate-polygon/coordinate-polygon.service';

@Module({
  controllers: [CoordinateController],
  providers: [
    CoordinateService,
    CoordinatePolygonService,
    {
      provide: APP_INTERCEPTOR,
      useClass: CacheInterceptor,
    },
  ],
  imports: [CacheModule.register()],
})
export class CoordinateModule {}
