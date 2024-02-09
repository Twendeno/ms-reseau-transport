import { Controller, Get, Param, Query } from '@nestjs/common';
import { CoordinateGeojsonService } from './coordinate-geojson.service';
import { ApiTags } from '@nestjs/swagger';

@Controller('coordinate-geojson')
@ApiTags('coordinate-geojson')
export class CoordinateGeojsonController {
  constructor(
    private readonly coordinateGeojsonService: CoordinateGeojsonService,
  ) {}

  @Get('geo/:uuidOrRefOrName')
  geojsonByTypeGeometryUuid(
    @Param('uuidOrRefOrName') uuidOrRefOrName: string,
    @Query('type') type: string,
    @Query('isStop') isStop: boolean = false,
    @Query('isFeature') isFeature: boolean = true,
  ) {
    return this.coordinateGeojsonService.geojsonByTypeGeometryUuid(
      uuidOrRefOrName,
      type,
      isStop,
      isFeature,
    );
  }
}
