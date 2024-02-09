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
import { JsonApiResponse } from '../models/json-api-response/json-api-response';
import { CoordinateDto } from './dto/coordinate.dto';
import { CoordinateService } from './coordinate.service';
import { ApiTags } from '@nestjs/swagger';
import { CacheInterceptor } from '@nestjs/cache-manager';

@Controller('coordinates')
@ApiTags('coordinates')
@UseInterceptors(CacheInterceptor)
export class CoordinateController {
  constructor(private readonly coordinateService: CoordinateService) {}
  @Post()
  create(
    @Body() coordinateDto: CoordinateDto,
  ): Promise<JsonApiResponse<CoordinateDto>> {
    return this.coordinateService.create(coordinateDto);
  }


  @Post('many')
  createMany(@Body() coordinates: number[][]) {
    return this.coordinateService.createMany(coordinates);
  }

  @Get()
  findAll(
    @Query('page') page: number = 1,
    @Query('perPage') perPage: number = 10,
  ): Promise<JsonApiResponse<CoordinateDto[]>> {
    return this.coordinateService.findAll(Number(page), Number(perPage));
  }

  @Get(':uuid')
  findOne(
    @Param('uuid') uuid: string,
  ): Promise<JsonApiResponse<CoordinateDto>> {
    return this.coordinateService.findOne(uuid);
  }

  @Get('/latlng/:latLng')
  findOneByLatLng(@Param('latLng') latLng: string
  ): Promise<JsonApiResponse<CoordinateDto>> {
    return this.coordinateService.findOneByLatLng(latLng.toString().trim());
  }

  @Put(':uuid')
  update(
    @Param('uuid') uuid: string,
    @Body() coordinateDto: CoordinateDto,
  ): Promise<JsonApiResponse<CoordinateDto>> {
    return this.coordinateService.update(uuid, coordinateDto);
  }

  @Delete(':uuid')
  delete(@Param('uuid') uuid: string): Promise<JsonApiResponse<CoordinateDto>> {
    return this.coordinateService.delete(uuid);
  }
}
