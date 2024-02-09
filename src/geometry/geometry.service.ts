import {
  ConflictException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { GeometryDto } from './dto/geometryDto';
import { JsonApiResponse } from '../models/json-api-response/json-api-response';
import { RandomValueGenerator } from '../models/random-value-generator/random-value-generator';
import { Util } from '../utils/util';

@Injectable()
export class GeometryService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(
    geometryDto: GeometryDto,
  ): Promise<JsonApiResponse<GeometryDto>> {
    geometryDto.reference = RandomValueGenerator.generateRandomAlphaNumeric(10);
    if (!geometryDto.color) geometryDto.color = Util.generateNewColor();

    let { name, reference,type , color, geodata, town_uuid, department_uuid,assignedBy, lastModifiedBy } =
      geometryDto;

    const geometryByRef = await this.prismaService.geometry.findUnique({
      where: { reference },
    });

    if (geometryByRef) throw new ConflictException('Geometry already exists');

    const geometryByColor = await this.prismaService.geometry.findFirst({
      where: { color },
    });

    if (geometryByColor)
      throw new ConflictException('Geometry already exists with this color');

    const newGeometry = await this.prismaService.geometry.create({
      data: {
        name: name.toLowerCase().trim(),
        reference,
        type: geometryDto.type.toString(),
        color,
        geodata,
        town_uuid,
        department_uuid,
        assignedBy,
        lastModifiedBy
      },
    });

    return new JsonApiResponse<GeometryDto>(
      HttpStatus.CREATED,
      'Geometry successfully created',
      newGeometry,
    );
  }

  async findAll(
    page: number,
    perPage: number,
  ): Promise<JsonApiResponse<GeometryDto[]>> {
    const skip = Number((page - 1) * perPage);
    const take = Number(perPage);
    const total = await this.prismaService.geometry.count();
    const meta = Util.getMetadata(total, page, perPage);

    const geometries = await this.prismaService.geometry.findMany({
      skip,
      take,
      orderBy: { createdAt: 'desc' },
      include: {
        coordinates: { select: { coordinate_uuid: true } },
        _count: true,
      },
    });

    return new JsonApiResponse<GeometryDto[]>(
      HttpStatus.OK,
      'All geometry founded',
      geometries,
      meta,
    );
  }

  async findOne(uuid: string): Promise<JsonApiResponse<GeometryDto>> {
    const geometry = await this.prismaService.geometry.findUnique({
      where: { uuid },
    });

    if (!geometry) throw new NotFoundException('Geometry not found');

    return new JsonApiResponse<GeometryDto>(
      HttpStatus.OK,
      'Geometry founded',
      geometry,
    );
  }

  async update(
    uuid: string,
    geometryDto: GeometryDto,
  ): Promise<JsonApiResponse<GeometryDto>> {
    const { name, geodata, town_uuid, department_uuid,assignedBy, lastModifiedBy } = geometryDto;
    // Check if the geometry exists
    const geometry = await this.prismaService.geometry.findUnique({
      where: { uuid },
    });

    if (!geometry) throw new NotFoundException('Geometry not found');

    const updatedGeometry = await this.prismaService.geometry.update({
      where: { uuid },
      data: {
        ...geometry,
        name,
        type: geometryDto.type.toString(),
        geodata,
        town_uuid,
        department_uuid,
        assignedBy,
        lastModifiedBy
      },
    });

    return new JsonApiResponse<GeometryDto>(
      HttpStatus.OK,
      'Geometry successfully updated',
      updatedGeometry,
    );
  }

  async delete(uuid: string): Promise<JsonApiResponse<GeometryDto>> {
    const geometry = await this.prismaService.geometry.findUnique({
      where: { uuid },
    });

    if (!geometry) throw new NotFoundException('Geometry not found');

    await this.prismaService.geometry.delete({
      where: { uuid },
    });

    return new JsonApiResponse<GeometryDto>(
      HttpStatus.OK,
      'Geometry successfully deleted',
      geometry,
    );
  }

  async findGeometryByReference(
    reference: string,
  ): Promise<JsonApiResponse<GeometryDto>> {
    const geometry = await this.prismaService.geometry.findUnique({
      where: { reference },
    });

    if (!geometry) throw new NotFoundException('Geometry not found');

    return new JsonApiResponse<GeometryDto>(
      HttpStatus.OK,
      'Geometry founded',
      geometry,
    );
  }
}
