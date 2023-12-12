import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { GeometryService } from "./geometry.service";
import { JsonApiResponse } from "../models/json-api-response/json-api-response";
import { GeometryDto } from "./dto/geometryDto";
import { ApiTags } from "@nestjs/swagger";

@Controller('geometries')
@ApiTags('geometries')
export class GeometryController {

  constructor(private readonly geometryService: GeometryService) {}

  @Get()
  findAll(): Promise<JsonApiResponse<GeometryDto[]>> {
    return this.geometryService.findAll();
  }

  @Get(':uuid')
  findOne(uuid: string): Promise<JsonApiResponse<GeometryDto>> {
    return this.geometryService.findOne(uuid);
  }

  @Post()
  create(@Body() geometryDto:GeometryDto): Promise<JsonApiResponse<GeometryDto>> {
    return this.geometryService.create(geometryDto);
  }

  @Put(':uuid')
  update(@Param('uuid') uuid: string, @Body() geometryDto: GeometryDto): Promise<JsonApiResponse<GeometryDto>> {
    return this.geometryService.update(uuid, geometryDto);
  }

  @Delete(':uuid')
  delete(@Param('uuid') uuid: string): Promise<JsonApiResponse<GeometryDto>> {
    return this.geometryService.delete(uuid);
  }

  @Get('ref/:reference')
  findByReference(@Param('reference')reference: string): Promise<JsonApiResponse<GeometryDto>> {
    return this.geometryService.findGeometryByReference(reference);
  }
}
