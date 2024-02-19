import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Req,
  UseInterceptors,
} from '@nestjs/common';
import { CoordinatePolygonService } from './coordinate-polygon.service';
import { JsonApiResponse } from '../models/json-api-response/json-api-response';
import { CoordinatePolygonDto } from './dto/coordinate-polygon.dto';
import { ApiTags } from '@nestjs/swagger';
import { CacheInterceptor } from '@nestjs/cache-manager';
import { Request } from 'express';
import { CoordinatePolygonEntity } from './models/coordinate-polygon.entity';

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
    @Req() req: Request,
  ): Promise<JsonApiResponse<CoordinatePolygonEntity[]>> {
    if (
      Object.keys(req.query).includes('page') ||
      Object.keys(req.query).includes('perPage')
    )
      return this.coordinatePolygonService.findAllPaginate(page, perPage);

    return this.coordinatePolygonService.findAll();
  }

  @Get(':uuid')
  findOne(
    @Param('uuid') uuid: string,
  ): Promise<JsonApiResponse<CoordinatePolygonEntity>> {
    return this.coordinatePolygonService.findOne(uuid);
  }

  @Post()
  create(
    @Body() coordinatePolygonDto: CoordinatePolygonDto,
  ): Promise<JsonApiResponse<CoordinatePolygonEntity>> {
    return this.coordinatePolygonService.create(coordinatePolygonDto);
  }

  @Put(':uuid')
  update(
    @Param('uuid') uuid: string,
    @Body() coordinatePolygonDto: CoordinatePolygonDto,
  ): Promise<JsonApiResponse<CoordinatePolygonEntity>> {
    return this.coordinatePolygonService.update(uuid, coordinatePolygonDto);
  }

  @Delete(':uuid')
  delete(
    @Param('uuid') uuid: string,
  ): Promise<JsonApiResponse<CoordinatePolygonEntity>> {
    return this.coordinatePolygonService.delete(uuid);
  }

  @Delete('deletes/coordinates-geometries')
  deleteMany(
    @Body() coordinateEntities: CoordinatePolygonEntity[],
    @Req() req: Request,
  ) {
    return this.coordinatePolygonService.deleteMany(coordinateEntities);
  }

  @Get('line/:uuid')
  findCoordinatePolygonByGeometryUuid(
    uuid: string,
  ): Promise<JsonApiResponse<CoordinatePolygonEntity[]>> {
    return this.coordinatePolygonService.findManyByGeometryUuid(uuid);
  }
}
