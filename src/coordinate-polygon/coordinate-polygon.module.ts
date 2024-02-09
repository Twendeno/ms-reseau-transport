import { Module } from '@nestjs/common';
import { CoordinatePolygonController } from './coordinate-polygon.controller';
import { CoordinatePolygonService } from './coordinate-polygon.service';
import { CacheInterceptor, CacheModule } from '@nestjs/cache-manager';
import { APP_INTERCEPTOR } from '@nestjs/core';

@Module({
  controllers: [CoordinatePolygonController],
  providers: [
    CoordinatePolygonService,
    {
      provide: APP_INTERCEPTOR,
      useClass: CacheInterceptor,
    },
  ],
  imports: [CacheModule.register()],
})
export class CoordinatePolygonModule {}
