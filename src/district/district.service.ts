import {
  ConflictException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { JsonApiResponse } from '../models/json-api-response/json-api-response';
import { DistrictDto } from './dto/district.dto';

@Injectable()
export class DistrictService {
  constructor(private readonly prismaService: PrismaService) {}

  async findAll(): Promise<JsonApiResponse<DistrictDto[]>> {
    const districts = await this.prismaService.district.findMany();
    return new JsonApiResponse<DistrictDto[]>(
      HttpStatus.OK,
      'Success',
      districts,
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

    const checkDistrictName = await this.prismaService.district.findUnique({
      where: { name },
    });

    if (checkDistrictName)
      throw new ConflictException(`District with name ${name} already exists`);

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
