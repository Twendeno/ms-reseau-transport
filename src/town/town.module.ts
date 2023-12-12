import { Module } from '@nestjs/common';
import { TownController } from './town.controller';
import { TownService } from './town.service';

@Module({
  controllers: [TownController],
  providers: [TownService]
})
export class TownModule {}
