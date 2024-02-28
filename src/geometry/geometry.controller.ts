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
import { GeometryService } from './geometry.service';
import { JsonApiResponse } from '../models/json-api-response/json-api-response';
import { GeometryDto } from './dto/geometryDto';
import { ApiTags } from '@nestjs/swagger';
import { CacheInterceptor } from '@nestjs/cache-manager';
import { Request } from 'express';
import { DistrictEntity } from '../district/models/district.entity';
import { GeometryEntity } from './models/geometry.entity';

@Controller('geometries')
@UseInterceptors(CacheInterceptor)
@ApiTags('geometries')
export class GeometryController {
  constructor(private readonly geometryService: GeometryService) {}

  @Get()
  findAll(
    @Query('page') page: number = 1,
    @Query('perPage') perPage: number = 10,
    @Req() req: Request,
  ): Promise<JsonApiResponse<GeometryEntity[]>> {
    if (
      Object.keys(req.query).includes('page') ||
      Object.keys(req.query).includes('perPage')
    )
      return this.geometryService.findAllPaginate(
        Number(page),
        Number(perPage),
      );

    return this.geometryService.findAll();
  }

  @Get(':uuid')
  findOne(
    @Param('uuid') uuid: string,
  ): Promise<JsonApiResponse<GeometryEntity>> {
    return this.geometryService.findOne(uuid);
  }

  @Post()
  create(
    @Body() geometryDto: GeometryDto,
  ): Promise<JsonApiResponse<GeometryEntity>> {
    return this.geometryService.create(geometryDto);
  }

  @Put(':uuid')
  update(
    @Param('uuid') uuid: string,
    @Body() geometryDto: GeometryDto,
  ): Promise<JsonApiResponse<GeometryEntity>> {
    return this.geometryService.update(uuid, geometryDto);
  }

  @Delete(':uuid')
  delete(
    @Param('uuid') uuid: string,
  ): Promise<JsonApiResponse<GeometryEntity>> {
    return this.geometryService.delete(uuid);
  }

  @Delete('deletes/geometries')
  deleteMany(@Body() geometryEntities: GeometryEntity[], @Req() req: Request) {
    return this.geometryService.deleteMany(geometryEntities);
  }

  @Get('ref/:reference')
  findByReference(
    @Param('reference') reference: string,
  ): Promise<JsonApiResponse<GeometryEntity>> {
    return this.geometryService.findGeometryByReference(reference);
  }
}
