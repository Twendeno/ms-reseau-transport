import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { JsonApiResponse } from "../json-api-response/json-api-response";
import { CoordinateDto } from "./dto/coordinateDto";
import { CoordinateService } from "./coordinate.service";

@Controller('coordinates')
export class CoordinateController {

  constructor(private readonly coordinateService: CoordinateService) {}
  @Post()
  create(@Body() coordinateDto:CoordinateDto): Promise<JsonApiResponse<CoordinateDto>> {
    return this.coordinateService.create(coordinateDto);
  }

  @Get()
  findAll(): Promise<JsonApiResponse<CoordinateDto[]>> {
    return this.coordinateService.findAll();
  }

  @Get(':uuid')
  findOne(@Param('uuid') uuid: string): Promise<JsonApiResponse<CoordinateDto>> {
    return this.coordinateService.findOne(uuid);
  }

  @Put(':uuid')
  update(@Param('uuid') uuid: string, @Body() coordinateDto: CoordinateDto): Promise<JsonApiResponse<CoordinateDto>> {
    return this.coordinateService.update(uuid, coordinateDto);
  }

  @Delete(':uuid')
  delete(@Param('uuid') uuid: string): Promise<JsonApiResponse<CoordinateDto>> {
    return this.coordinateService.delete(uuid);
  }

  @Get('geojson/:uuid')
  geojsonPoint(@Param('uuid') uuid: string) {
    return this.coordinateService.geojsonPoint(uuid);
  }
}
