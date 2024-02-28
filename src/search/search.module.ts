import { Module } from '@nestjs/common';
import { SearchController } from './search.controller';
import { SearchService } from './search.service';
import { CacheModule } from '@nestjs/cache-manager';

@Module({
  controllers: [SearchController],
  providers: [SearchService],
  imports: [CacheModule.register()],
})
export class SearchModule {}
