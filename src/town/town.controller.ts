import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { TownService } from "./town.service";
import { TownDto } from "./dto/town.dto";

@Controller('towns')
export class TownController {

  constructor(private readonly townService: TownService) {}

  @Get()
  findAll() {
    return this.townService.findAll();
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
