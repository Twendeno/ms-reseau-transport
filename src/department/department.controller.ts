import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { DepartmentService } from './department.service';
import { JsonApiResponse } from '../models/json-api-response/json-api-response';
import { DepartmentDto } from './dto/department.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('departments')
@ApiTags('departments')
export class DepartmentController {
  constructor(private readonly departmentService: DepartmentService) {}

  @Get()
  findAll(): Promise<JsonApiResponse<DepartmentDto[]>> {
    return this.departmentService.findAll();
  }

  @Get(':uuidOrName')
  findOne(
    @Param('uuidOrName') uuidOrName: string,
  ): Promise<JsonApiResponse<DepartmentDto>> {
    return this.departmentService.findOne(uuidOrName);
  }

  @Post()
  create(
    @Body() departmentDto: DepartmentDto,
  ): Promise<JsonApiResponse<DepartmentDto>> {
    return this.departmentService.create(departmentDto);
  }

  @Put(':uuid')
  update(
    @Param('uuid') uuid: string,
    @Body() departmentDto: DepartmentDto,
  ): Promise<JsonApiResponse<DepartmentDto>> {
    return this.departmentService.update(uuid, departmentDto);
  }

  @Delete(':uuid')
  delete(@Param('uuid') uuid: string): Promise<JsonApiResponse<DepartmentDto>> {
    return this.departmentService.delete(uuid);
  }
}
