import { ConflictException, HttpStatus, Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { JsonApiResponse } from "../models/json-api-response/json-api-response";
import { TownDto } from "./dto/town.dto";

@Injectable()
export class TownService {

  constructor(private readonly prismaService: PrismaService) {}

  async create(townDto: TownDto): Promise<JsonApiResponse<TownDto>> {
   const { name, area, coordinate_uuid, department_uuid, geometry_uuid, assignedBy, lastModifiedBy } = townDto;

   const town = await this.prismaService.town.findUnique({where: {name}});

   if (town) throw new ConflictException(`Town with name ${name} already exists`);

    const createdTown = await this.prismaService.town.create({
      data: {
        name,
        area,
        coordinate_uuid,
        department_uuid,
        geometry_uuid,
        assignedBy,
        lastModifiedBy
      }
    });
    return new JsonApiResponse<TownDto>(HttpStatus.CREATED, 'Town created successfully', createdTown);
  }

  async findAll(): Promise<JsonApiResponse<TownDto[]>> {
    const towns = await this.prismaService.town.findMany();
    return new JsonApiResponse<TownDto[]>(HttpStatus.OK, 'Towns retrieved successfully', towns);
  }

  async findOne(uuidOrName: string): Promise<JsonApiResponse<TownDto>> {
    const town = await this.prismaService.town.findFirst({where: {OR: [{uuid: uuidOrName}, {name: uuidOrName}]}});

    return new JsonApiResponse<TownDto>(HttpStatus.OK, 'Town retrieved successfully', town);
  }

  async update(uuid: string, townDto: TownDto): Promise<JsonApiResponse<TownDto>> {
    const { name, area, coordinate_uuid, department_uuid, geometry_uuid, assignedBy, lastModifiedBy } = townDto;

    const town = await this.prismaService.town.findUnique({where: {uuid}});

    if (!town) throw new ConflictException(`Town with uuid ${uuid} does not exist`);

    const townWithSameName = await this.prismaService.town.findUnique({where: {name}});

    if (townWithSameName) throw new ConflictException(`Town with name ${name} already exists`);

    const updatedTown = await this.prismaService.town.update({
      where: {uuid},
      data: {
        name,
        area,
        coordinate_uuid,
        department_uuid,
        geometry_uuid,
        assignedBy,
        lastModifiedBy
      }
    });

    return new JsonApiResponse<TownDto>(HttpStatus.OK, 'Town updated successfully', updatedTown);
  }

  async delete(uuid: string): Promise<JsonApiResponse<TownDto>> {
    const town = await this.prismaService.town.findUnique({where: {uuid}});

    if (!town) throw new ConflictException(`Town with uuid ${uuid} does not exist`);

    const deletedTown = await this.prismaService.town.delete({where: {uuid}});

    return new JsonApiResponse<TownDto>(HttpStatus.OK, 'Town deleted successfully', deletedTown);
  }
}
