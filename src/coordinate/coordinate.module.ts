import { Module } from '@nestjs/common';
import { CoordinateController } from './coordinate.controller';
import { CoordinateService } from './coordinate.service';

@Module({
  controllers: [CoordinateController],
  providers: [CoordinateService],
})
export class CoordinateModule {}
