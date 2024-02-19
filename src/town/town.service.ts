import { ConflictException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { JsonApiResponse } from '../models/json-api-response/json-api-response';
import { TownDto } from './dto/town.dto';
import { Util } from '../utils/util';
import { TownEntity } from './models/town.entity';

@Injectable()
export class TownService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(townDto: TownDto): Promise<JsonApiResponse<TownEntity>> {
    const {
      name,
      area,
      coordinate_uuid,
      department_uuid,
      assignedBy,
      lastModifiedBy,
      geodata,
    } = townDto;

    const town = await this.prismaService.town.findUnique({ where: { name } });

    if (town)
      throw new ConflictException(`Town with name ${name} already exists`);

    const createdTown = await this.prismaService.town.create({
      data: {
        name,
        area,
        coordinate_uuid,
        department_uuid,
        assignedBy,
        lastModifiedBy,
        geodata,
      },
    });
    return new JsonApiResponse<TownEntity>(
      HttpStatus.CREATED,
      'Town created successfully',
      createdTown,
    );
  }

  async findAll(): Promise<JsonApiResponse<TownEntity[]>> {
    const towns = await this.prismaService.town.findMany({
      include: {
        _count: true,
        geometry: true,
        districts: true,
      },
    });
    return new JsonApiResponse<TownEntity[]>(
      HttpStatus.OK,
      'Towns retrieved successfully',
      towns,
    );
  }

  async findAllPaginate(
    page: number,
    perPage: number,
  ): Promise<JsonApiResponse<TownEntity[]>> {
    const skip = Number((page - 1) * perPage);
    const take = Number(perPage);
    const total = await this.prismaService.town.count();
    const meta = Util.getMetadata(total, page, perPage);

    const towns = await this.prismaService.town.findMany({
      skip,
      take,
      include: {
        _count: true,
        geometry: true,
        districts: true,
      },
    });
    return new JsonApiResponse<TownEntity[]>(
      HttpStatus.OK,
      'Towns retrieved successfully',
      towns,
      meta,
    );
  }

  async findOne(uuidOrName: string): Promise<JsonApiResponse<TownEntity>> {
    const town = await this.prismaService.town.findFirst({
      where: { OR: [{ uuid: uuidOrName }, { name: uuidOrName }] },
    });

    return new JsonApiResponse<TownEntity>(
      HttpStatus.OK,
      'Town retrieved successfully',
      town,
    );
  }

  async update(
    uuid: string,
    townDto: TownDto,
  ): Promise<JsonApiResponse<TownEntity>> {
    const {
      name,
      area,
      coordinate_uuid,
      department_uuid,
      assignedBy,
      lastModifiedBy,
      geodata,
    } = townDto;

    const town = await this.prismaService.town.findUnique({ where: { uuid } });

    if (!town)
      throw new ConflictException(`Town with uuid ${uuid} does not exist`);

    const updatedTown = await this.prismaService.town.update({
      where: { uuid },
      data: {
        name,
        area,
        coordinate_uuid,
        department_uuid,
        assignedBy,
        lastModifiedBy,
        geodata,
      },
    });

    return new JsonApiResponse<TownEntity>(
      HttpStatus.OK,
      'Town updated successfully',
      updatedTown,
    );
  }

  async delete(uuid: string): Promise<JsonApiResponse<TownEntity>> {
    const town = await this.prismaService.town.findUnique({ where: { uuid } });

    if (!town)
      throw new ConflictException(`Town with uuid ${uuid} does not exist`);

    const deletedTown = await this.prismaService.town.delete({
      where: { uuid },
    });

    return new JsonApiResponse<TownEntity>(
      HttpStatus.OK,
      'Town deleted successfully',
      deletedTown,
    );
  }

  async deleteMany(townEntity: TownEntity[]) {
    try {
      await this.prismaService.$transaction(async (prisma) => {
        for (const { uuid } of townEntity) {
          await this.delete(uuid);
        }
      });
    } catch (error) {
      throw new Error(`error`);
    }
  }
}
