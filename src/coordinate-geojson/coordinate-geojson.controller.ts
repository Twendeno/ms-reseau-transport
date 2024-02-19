import { Controller, Get, Param, Query, UseInterceptors } from '@nestjs/common';
import { CoordinateGeojsonService } from './coordinate-geojson.service';
import { ApiTags } from '@nestjs/swagger';
import { CacheInterceptor } from '@nestjs/cache-manager';

@Controller('coordinate-geojson')
@ApiTags('coordinate-geojson')
@UseInterceptors(CacheInterceptor)
export class CoordinateGeojsonController {
  constructor(
    private readonly coordinateGeojsonService: CoordinateGeojsonService,
  ) {}

  @Get('geo/:uuidOrRefOrName')
  geojsonByTypeGeometryUuid(
    @Param('uuidOrRefOrName') uuidOrRefOrName: string,
    @Query('type') type: string,
    @Query('isStop') isStop: boolean = false,
    @Query('isFeature') isFeature: string = 'feature',
  ) {
    return this.coordinateGeojsonService.geojsonByTypeGeometryUuid(
      uuidOrRefOrName,
      type,
      isStop,
      isFeature,
    );
  }

  @Get()
  geojsonCollection() {
    return this.coordinateGeojsonService.geojsonCollection();
  }
  @Get('cluster-station')
  geojsonClusterStation() {
    return this.coordinateGeojsonService.geojsonClusterStation();
  }
}
