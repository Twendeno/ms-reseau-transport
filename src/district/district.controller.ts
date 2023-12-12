import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { DistrictService } from "./district.service";
import { JsonApiResponse } from "../models/json-api-response/json-api-response";
import { DistrictDto } from "./dto/district.dto";
import { ApiTags } from "@nestjs/swagger";

@Controller('districts')
@ApiTags('districts')
export class DistrictController {

  constructor(private readonly districtService: DistrictService) {}

  @Get()
  async findAll(): Promise<JsonApiResponse<DistrictDto[]>> {
    return this.districtService.findAll();
  }

  @Get(':uuidOrName')
  async findOne(@Param('uuidOrName') uuidOrName: string): Promise<JsonApiResponse<DistrictDto>> {
    return this.districtService.findOne(uuidOrName);
  }

  @Post()
  async create(@Body() districtDto: DistrictDto): Promise<JsonApiResponse<DistrictDto>> {
    return this.districtService.create(districtDto);
  }

  @Put(':uuid')
  async update(@Param('uuid') uuid: string, @Body() districtDto: DistrictDto): Promise<JsonApiResponse<DistrictDto>> {
    return this.districtService.update(uuid, districtDto);
  }

  @Delete(':uuid')
  async delete(@Param('uuid') uuid: string): Promise<JsonApiResponse<DistrictDto>> {
    return this.districtService.delete(uuid);
  }
}
