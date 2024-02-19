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
import { DepartmentService } from './department.service';
import { JsonApiResponse } from '../models/json-api-response/json-api-response';
import { DepartmentDto } from './dto/department.dto';
import { ApiTags } from '@nestjs/swagger';
import { CacheInterceptor } from '@nestjs/cache-manager';
import { Request } from 'express';
import { DepartmentEntity } from './models/department.entity';

@Controller('departments')
@ApiTags('departments')
@UseInterceptors(CacheInterceptor)
export class DepartmentController {
  constructor(private readonly departmentService: DepartmentService) {}

  @Get()
  findAll(
    @Query('page') page: number = 1,
    @Query('perPage') perPage: number = 10,
    @Req() req: Request,
  ): Promise<JsonApiResponse<DepartmentEntity[]>> {
    if (
      Object.keys(req.query).includes('page') ||
      Object.keys(req.query).includes('perPage')
    )
      return this.departmentService.findAllPaginate(page, perPage);

    return this.departmentService.findAll();
  }

  @Get(':uuidOrName')
  findOne(
    @Param('uuidOrName') uuidOrName: string,
  ): Promise<JsonApiResponse<DepartmentEntity>> {
    return this.departmentService.findOne(uuidOrName);
  }

  @Post()
  create(
    @Body() departmentDto: DepartmentDto,
  ): Promise<JsonApiResponse<DepartmentEntity>> {
    return this.departmentService.create(departmentDto);
  }

  @Put(':uuid')
  update(
    @Param('uuid') uuid: string,
    @Body() departmentDto: DepartmentDto,
  ): Promise<JsonApiResponse<DepartmentEntity>> {
    return this.departmentService.update(uuid, departmentDto);
  }

  @Delete(':uuid')
  delete(
    @Param('uuid') uuid: string,
  ): Promise<JsonApiResponse<DepartmentEntity>> {
    return this.departmentService.delete(uuid);
  }

  @Delete('deletes/departments')
  deleteMany(
    @Body() departmentEntities: DepartmentEntity[],
    @Req() req: Request,
  ) {
    return this.departmentService.deleteMany(departmentEntities);
  }
}
