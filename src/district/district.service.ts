import {
  ConflictException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { JsonApiResponse } from '../models/json-api-response/json-api-response';
import { DistrictDto } from './dto/district.dto';
import { Util } from '../utils/util';

@Injectable()
export class DistrictService {
  constructor(private readonly prismaService: PrismaService) {}

  async findAll(
    page: number,
    perPage: number,
  ): Promise<JsonApiResponse<DistrictDto[]>> {
    const skip = Number((page - 1) * perPage);
    const take = Number(perPage);
    const total = await this.prismaService.district.count();
    const meta = Util.getMetadata(total, page, perPage);

    const districts = await this.prismaService.district.findMany({
      skip,
      take,
    });
    return new JsonApiResponse<DistrictDto[]>(
      HttpStatus.OK,
      'Success',
      districts,
      meta,
    );
  }

  async findOne(uuidOrName: string): Promise<JsonApiResponse<DistrictDto>> {
    const district = await this.prismaService.district.findFirst({
      where: {
        OR: [{ uuid: uuidOrName }, { name: uuidOrName }],
      },
    });

    if (!district)
      throw new NotFoundException(
        `District with id or name ${uuidOrName} not found`,
      );

    return new JsonApiResponse<DistrictDto>(
      HttpStatus.OK,
      'District found',
      district,
    );
  }

  async create(
    districtDto: DistrictDto,
  ): Promise<JsonApiResponse<DistrictDto>> {
    const { name } = districtDto;
    const checkDistrictName = await this.prismaService.district.findUnique({
      where: {
        name,
      },
    });

    if (checkDistrictName)
      throw new ConflictException(`District with name ${name} already exists`);

    const district = await this.prismaService.district.create({
      data: districtDto,
    });

    return new JsonApiResponse<DistrictDto>(
      HttpStatus.CREATED,
      'District created',
      district,
    );
  }

  async update(
    uuid: string,
    districtDto: DistrictDto,
  ): Promise<JsonApiResponse<DistrictDto>> {
    const { name } = districtDto;
    const checkDistrictUUid = await this.prismaService.district.findUnique({
      where: { uuid },
    });

    if (!checkDistrictUUid)
      throw new NotFoundException(`District with uuid ${uuid} not found`);

    const district = await this.prismaService.district.update({
      where: {
        uuid,
      },
      data: districtDto,
    });

    return new JsonApiResponse<DistrictDto>(
      HttpStatus.OK,
      'District updated',
      district,
    );
  }

  async delete(uuid: string): Promise<JsonApiResponse<DistrictDto>> {
    const district = await this.prismaService.district.findUnique({
      where: { uuid },
    });

    if (!district)
      throw new NotFoundException(`District with uuid ${uuid} not found`);

    await this.prismaService.district.delete({ where: { uuid } });

    return new JsonApiResponse<DistrictDto>(
      HttpStatus.OK,
      'District deleted',
      district,
    );
  }
}
