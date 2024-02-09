import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { CoordinatePolygonService } from './coordinate-polygon.service';
import { JsonApiResponse } from '../models/json-api-response/json-api-response';
import { CoordinatePolygonDto } from './dto/coordinate-polygon.dto';
import { ApiTags } from '@nestjs/swagger';
import { CacheInterceptor } from '@nestjs/cache-manager';

@Controller('coordinate-polygon')
@ApiTags('coordinate-polygon')
@UseInterceptors(CacheInterceptor)
export class CoordinatePolygonController {
  constructor(
    private readonly coordinatePolygonService: CoordinatePolygonService,
  ) {}

  @Get()
  findAll(
    @Query('page') page: number = 1,
    @Query('perPage') perPage: number = 10,
  ): Promise<JsonApiResponse<CoordinatePolygonDto[]>> {
    return this.coordinatePolygonService.findAll(page, perPage);
  }

  @Get(':uuid')
  findOne(
    @Param('uuid') uuid: string,
  ): Promise<JsonApiResponse<CoordinatePolygonDto>> {
    return this.coordinatePolygonService.findOne(uuid);
  }

  @Post()
  create(
    @Body() coordinatePolygonDto: CoordinatePolygonDto,
  ): Promise<JsonApiResponse<CoordinatePolygonDto>> {
    return this.coordinatePolygonService.create(coordinatePolygonDto);
  }

  @Put(':uuid')
  update(
    @Param('uuid') uuid: string,
    @Body() coordinatePolygonDto: CoordinatePolygonDto,
  ): Promise<JsonApiResponse<CoordinatePolygonDto>> {
    return this.coordinatePolygonService.update(uuid, coordinatePolygonDto);
  }

  @Delete(':uuid')
  delete(
    @Param('uuid') uuid: string,
  ): Promise<JsonApiResponse<CoordinatePolygonDto>> {
    return this.coordinatePolygonService.delete(uuid);
  }

  @Get('line/:uuid')
  findCoordinatePolygonByGeometryUuid(
    uuid: string,
  ): Promise<JsonApiResponse<CoordinatePolygonDto[]>> {
    return this.coordinatePolygonService.findManyByGeometryUuid(uuid);
  }
}
