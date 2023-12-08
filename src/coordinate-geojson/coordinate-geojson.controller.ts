import { Controller, Get, Param } from "@nestjs/common";
import { CoordinateGeojsonService } from "./coordinate-geojson.service";
import {
  MultiLineString,
  MultiPoint,
  MultiPolygon,
  Point,
  Polygon
} from "../models/geojson-api-response/geojson-api-response";

@Controller('coordinate-geojson')
export class CoordinateGeojsonController {

  constructor(private readonly coordinateGeojsonService: CoordinateGeojsonService) {}

  @Get('point/:uuid')
  geojsonPoint(@Param('uuid') uuid: string) : Promise<Point>{
    return this.coordinateGeojsonService.geojsonPoint(uuid);
  }

  @Get("multi-point")
  geojsonMultiPoint() : Promise<MultiPoint> {
    return this.coordinateGeojsonService.geojsonMultiPoint();
  }

  @Get("line-string")
  geojsonLineString() : Promise<MultiPoint> {
    return this.coordinateGeojsonService.geojsonLineString();
  }

  @Get("multi-line-string")
  geojsonMultiLineString() : Promise<MultiLineString> {
    return this.coordinateGeojsonService.geojsonMultiLineString();
  }

  @Get("polygon")
  geojsonPolygon() : Promise<Polygon> {
    return this.coordinateGeojsonService.geojsonPolygon();
  }

  @Get("multi-polygon")
  geojsonMultiPolygon() : Promise<MultiPolygon> {
    return this.coordinateGeojsonService.geojsonMultiPolygon();
  }

}
