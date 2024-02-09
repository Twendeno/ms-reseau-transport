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
import { TownService } from './town.service';
import { TownDto } from './dto/town.dto';
import { ApiTags } from '@nestjs/swagger';
import { CacheInterceptor } from '@nestjs/cache-manager';

@Controller('towns')
@ApiTags('towns')
@UseInterceptors(CacheInterceptor)
export class TownController {
  constructor(private readonly townService: TownService) {}

  @Get()
  findAll(
    @Query('page') page: number = 1,
    @Query('perPage') perPage: number = 10,
  ) {
    return this.townService.findAll(Number(page), Number(perPage));
  }

  @Get(':uuidOrName')
  findOne(@Param('uuidOrName') uuidOrName: string) {
    return this.townService.findOne(uuidOrName);
  }

  @Post()
  create(@Body() townDto: TownDto) {
    return this.townService.create(townDto);
  }

  @Put(':uuid')
  update(@Param('uuid') uuid: string, @Body() townDto: TownDto) {
    return this.townService.update(uuid, townDto);
  }

  @Delete(':uuid')
  delete(@Param('uuid') uuid: string) {
    return this.townService.delete(uuid);
  }
}
