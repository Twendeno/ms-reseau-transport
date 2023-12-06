import { Module } from '@nestjs/common';
import { CoordinateGeojsonController } from './coordinate-geojson.controller';
import { CoordinateGeojsonService } from './coordinate-geojson.service';

@Module({
  controllers: [CoordinateGeojsonController],
  providers: [CoordinateGeojsonService]
})
export class CoordinateGeojsonModule {}
