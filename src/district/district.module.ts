import { Module } from '@nestjs/common';
import { DistrictController } from './district.controller';
import { DistrictService } from './district.service';
import { CacheInterceptor, CacheModule } from '@nestjs/cache-manager';
import { APP_INTERCEPTOR } from '@nestjs/core';

@Module({
  controllers: [DistrictController],
  providers: [
    DistrictService,
    {
      provide: APP_INTERCEPTOR,
      useClass: CacheInterceptor,
    },
  ],
  imports: [CacheModule.register()],
})
export class DistrictModule {}
