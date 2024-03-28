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
import { JsonApiResponse } from '../models/json-api-response/json-api-response';
import { CoordinateDto } from './dto/coordinate.dto';
import { CoordinateService } from './coordinate.service';
import { ApiTags } from '@nestjs/swagger';
import { CacheInterceptor } from '@nestjs/cache-manager';
import { Request } from 'express';
import { CoordinateEntity } from './models/coordinate.entity';
import { CreateManyCoordinateDto } from './dto/create-many-coordinate.dto';
import { UpdateCoordinateDto } from "./dto/update-coordinate.dto";

@Controller('coordinates')
@ApiTags('coordinates')
@UseInterceptors(CacheInterceptor)
export class CoordinateController {
  constructor(private readonly coordinateService: CoordinateService) {}
  @Post()
  create(
    @Body() coordinateDto: CoordinateDto,
  ): Promise<JsonApiResponse<CoordinateEntity>> {
    return this.coordinateService.create(coordinateDto);
  }
  @Post('many')
  createManyCoordinate(
    @Body('coordinates') coordinates: CreateManyCoordinateDto[],
    @Body('geometry_uuid') geometry_uuid: string,
    @Body('assignedBy') assignedBy: string,
  ) {
    const data = { geometry_uuid, assignedBy };
    return this.coordinateService.createMany(coordinates, data);
  }

  @Get()
  findAll(
    @Query('page') page: number = 1,
    @Query('perPage') perPage: number = 10,
    @Req() req: Request,
  ): Promise<JsonApiResponse<CoordinateEntity[]>> {
    if (
      Object.keys(req.query).includes('page') ||
      Object.keys(req.query).includes('perPage')
    )
      return this.coordinateService.findAllPaginate(
        Number(page),
        Number(perPage),
      );

    return this.coordinateService.findAll();
  }

  @Get(':uuid')
  findOne(
    @Param('uuid') uuid: string,
  ): Promise<JsonApiResponse<CoordinateEntity>> {
    return this.coordinateService.findOne(uuid);
  }

  @Get('/latlng/:latLng')
  findOneByLatLng(
    @Param('latLng') latLng: string,
  ): Promise<JsonApiResponse<CoordinateEntity>> {
    return this.coordinateService.findOneByLatLng(latLng.toString().trim());
  }

  @Put(':uuid')
  update(
    @Param('uuid') uuid: string,
    @Body() coordinateDto: UpdateCoordinateDto,
  ): Promise<JsonApiResponse<CoordinateEntity>> {
    return this.coordinateService.update(uuid, coordinateDto);
  }

  @Delete('deletes/coordinates')
  deleteMany(
    @Body() coordinateEntities: CoordinateEntity[],
    @Req() req: Request,
  ) {
    return this.coordinateService.deleteMany(coordinateEntities);
  }

  @Delete(':uuid')
  delete(
    @Param('uuid') uuid: string,
  ): Promise<JsonApiResponse<CoordinateEntity>> {
    return this.coordinateService.delete(uuid);
  }
}
