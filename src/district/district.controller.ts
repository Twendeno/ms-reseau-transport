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
import { DistrictService } from './district.service';
import { JsonApiResponse } from '../models/json-api-response/json-api-response';
import { DistrictDto } from './dto/district.dto';
import { ApiTags } from '@nestjs/swagger';
import { CacheInterceptor } from '@nestjs/cache-manager';
import { Request } from 'express';
import { DepartmentEntity } from '../department/models/department.entity';
import { DistrictEntity } from './models/district.entity';

@Controller('districts')
@ApiTags('districts')
@UseInterceptors(CacheInterceptor)
export class DistrictController {
  constructor(private readonly districtService: DistrictService) {}

  @Get()
  async findAll(
    @Query('page') page: number = 1,
    @Query('perPage') perPage: number = 10,
    @Req() req: Request,
  ): Promise<JsonApiResponse<DistrictEntity[]>> {
    if (
      Object.keys(req.query).includes('page') ||
      Object.keys(req.query).includes('perPage')
    )
      return this.districtService.findAllPaginate(page, perPage);

    return this.districtService.findAll();
  }

  @Get(':uuidOrName')
  async findOne(
    @Param('uuidOrName') uuidOrName: string,
  ): Promise<JsonApiResponse<DistrictEntity>> {
    return this.districtService.findOne(uuidOrName);
  }

  @Post()
  async create(
    @Body() districtDto: DistrictDto,
  ): Promise<JsonApiResponse<DistrictEntity>> {
    return this.districtService.create(districtDto);
  }

  @Put(':uuid')
  async update(
    @Param('uuid') uuid: string,
    @Body() districtDto: DistrictDto,
  ): Promise<JsonApiResponse<DistrictEntity>> {
    return this.districtService.update(uuid, districtDto);
  }

  @Delete(':uuid')
  async delete(
    @Param('uuid') uuid: string,
  ): Promise<JsonApiResponse<DistrictEntity>> {
    return this.districtService.delete(uuid);
  }

  @Delete('deletes/districts')
  deleteMany(@Body() districtEntities: DistrictEntity[], @Req() req: Request) {
    return this.districtService.deleteMany(districtEntities);
  }
}
