import { Module } from '@nestjs/common';
import { CoordinatePolygonController } from './coordinate-polygon.controller';
import { CoordinatePolygonService } from './coordinate-polygon.service';

@Module({
  controllers: [CoordinatePolygonController],
  providers: [CoordinatePolygonService],
})
export class CoordinatePolygonModule {}
