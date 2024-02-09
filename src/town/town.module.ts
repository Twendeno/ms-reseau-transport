import { Module } from '@nestjs/common';
import { TownController } from './town.controller';
import { TownService } from './town.service';
import { CacheInterceptor, CacheModule } from '@nestjs/cache-manager';
import { APP_INTERCEPTOR } from '@nestjs/core';

@Module({
  controllers: [TownController],
  providers: [
    TownService,
    {
      provide: APP_INTERCEPTOR,
      useClass: CacheInterceptor,
    },
  ],
  imports: [CacheModule.register()],
})
export class TownModule {}
