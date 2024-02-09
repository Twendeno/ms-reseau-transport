import { ConflictException, HttpStatus, Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from '../prisma/prisma.service';
import { CoordinatePolygonDto } from './dto/coordinate-polygon.dto';
import { JsonApiResponse } from '../models/json-api-response/json-api-response';
import { Util } from '../utils/util';
import { RandomValueGenerator } from "../models/random-value-generator/random-value-generator";

@Injectable()
export class CoordinatePolygonService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(
    coordinatePolygonDto: CoordinatePolygonDto,
  ): Promise<JsonApiResponse<CoordinatePolygonDto>> {

    coordinatePolygonDto.reference = RandomValueGenerator.generateRandomAlphaNumeric(12);
    coordinatePolygonDto.name = `${coordinatePolygonDto.departure} - ${coordinatePolygonDto.arrival}`;

    const { geometry_uuid, coordinate_uuid, assignedBy,departure,arrival,isOnline,name,reference } = coordinatePolygonDto;

    const coordinateExistOnCoordinatePolygon = await this.prismaService.coordinatePolygon.findFirst({
      where: { AND: [{ coordinate_uuid }, { geometry_uuid }] },
    });

    if (coordinateExistOnCoordinatePolygon) throw new ConflictException(`coordinate already exist on geometry`)

    const geometry = await this.prismaService.geometry.findUnique({
      where: { uuid: geometry_uuid },
    });

    if (!geometry)
      throw new NotFoundException(`geometry not found`);

    const coordinate = await this.prismaService.coordinate.findUnique({
      where: { uuid: coordinate_uuid },
    });

    if (!coordinate)
      throw new NotFoundException(
        `coordinate not found`,
      );

    const coordinatePolygon = await this.prismaService.coordinatePolygon.create(
      {
        data: coordinatePolygonDto,
      },
    );

    return new JsonApiResponse<CoordinatePolygonDto>(
      HttpStatus.CREATED,
      'coordinate created',
      coordinatePolygon,
    );
  }

  async findAll(
    page: number,
    perPage: number,
  ): Promise<JsonApiResponse<CoordinatePolygonDto[]>> {
    const skip = Number((page - 1) * perPage);
    const take = Number(perPage);
    const total = await this.prismaService.coordinatePolygon.count();
    const meta = Util.getMetadata(total, page, perPage);

    const coordinatePolygons =
      await this.prismaService.coordinatePolygon.findMany({
        skip,
        take,
        distinct: ['geometry_uuid'],
        include: {
          geometry: {
            select: {
              uuid: true,
              name: true,
              type: true,
              reference: true,
              _count: true,
              coordinates: {
                select: {
                  coordinate_uuid: true,
                },
              },
            },
          },
        },
      });
    return new JsonApiResponse<CoordinatePolygonDto[]>(
      HttpStatus.OK,
      'coordinate found',
      coordinatePolygons,
      meta,
    );
  }

  async findOne(uuid: string): Promise<JsonApiResponse<CoordinatePolygonDto>> {
    const coordinatePolygon =
      await this.prismaService.coordinatePolygon.findUnique({
        where: { uuid },
      });
    return new JsonApiResponse<CoordinatePolygonDto>(
      HttpStatus.OK,
      'coordinate found',
      coordinatePolygon,
    );
  }

  async update(
    uuid: string,
    coordinatePolygonDto: CoordinatePolygonDto,
  ): Promise<JsonApiResponse<CoordinatePolygonDto>> {

    coordinatePolygonDto.name = `${coordinatePolygonDto.departure} - ${coordinatePolygonDto.arrival}`;
    const { geometry_uuid, coordinate_uuid,departure,arrival,isOnline,name } = coordinatePolygonDto;

    const coordinateExistOnCoordinatePolygon = await this.prismaService.coordinatePolygon.findFirst({
      where: { AND: [{ coordinate_uuid }, { geometry_uuid }] },
    });

    if (coordinateExistOnCoordinatePolygon) throw new ConflictException(`coordinate already exist on geometry`)

    const coordinatePolygon = await this.prismaService.coordinatePolygon.update(
      {
        where: { uuid },
        data: coordinatePolygonDto,
      },
    );

    return new JsonApiResponse<CoordinatePolygonDto>(
      HttpStatus.OK,
      'coordinate updated',
      coordinatePolygon,
    );
  }

  async delete(uuid: string): Promise<JsonApiResponse<CoordinatePolygonDto>> {
    const coordinatePolygon = await this.prismaService.coordinatePolygon.delete(
      {
        where: { uuid },
      },
    );
    return new JsonApiResponse<CoordinatePolygonDto>(
      HttpStatus.OK,
      'coordinate deleted',
      coordinatePolygon,
    );
  }

  async findManyByGeometryUuid(
    geometry_uuid: string,
  ): Promise<JsonApiResponse<CoordinatePolygonDto[]>> {
    const coordinatePolygons =
      await this.prismaService.coordinatePolygon.findMany({
        where: { geometry_uuid },
      });
    return new JsonApiResponse<CoordinatePolygonDto[]>(
      HttpStatus.OK,
      'coordinate found',
      coordinatePolygons,
    );
  }
}
