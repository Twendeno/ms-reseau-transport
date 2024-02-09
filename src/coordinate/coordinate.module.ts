import { Module } from '@nestjs/common';
import { CoordinateController } from './coordinate.controller';
import { CoordinateService } from './coordinate.service';
import { CacheInterceptor, CacheModule } from '@nestjs/cache-manager';
import { APP_INTERCEPTOR } from '@nestjs/core';

@Module({
  controllers: [CoordinateController],
  providers: [
    CoordinateService,
    {
      provide: APP_INTERCEPTOR,
      useClass: CacheInterceptor,
    },
  ],
  imports: [CacheModule.register()],
})
export class CoordinateModule {}
