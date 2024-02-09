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
import { DistrictService } from './district.service';
import { JsonApiResponse } from '../models/json-api-response/json-api-response';
import { DistrictDto } from './dto/district.dto';
import { ApiTags } from '@nestjs/swagger';
import { CacheInterceptor } from '@nestjs/cache-manager';

@Controller('districts')
@ApiTags('districts')
@UseInterceptors(CacheInterceptor)
export class DistrictController {
  constructor(private readonly districtService: DistrictService) {}

  @Get()
  async findAll(
    @Query('page') page: number = 1,
    @Query('perPage') perPage: number = 10,
  ): Promise<JsonApiResponse<DistrictDto[]>> {
    return this.districtService.findAll(page, perPage);
  }

  @Get(':uuidOrName')
  async findOne(
    @Param('uuidOrName') uuidOrName: string,
  ): Promise<JsonApiResponse<DistrictDto>> {
    return this.districtService.findOne(uuidOrName);
  }

  @Post()
  async create(
    @Body() districtDto: DistrictDto,
  ): Promise<JsonApiResponse<DistrictDto>> {
    return this.districtService.create(districtDto);
  }

  @Put(':uuid')
  async update(
    @Param('uuid') uuid: string,
    @Body() districtDto: DistrictDto,
  ): Promise<JsonApiResponse<DistrictDto>> {
    return this.districtService.update(uuid, districtDto);
  }

  @Delete(':uuid')
  async delete(
    @Param('uuid') uuid: string,
  ): Promise<JsonApiResponse<DistrictDto>> {
    return this.districtService.delete(uuid);
  }
}
