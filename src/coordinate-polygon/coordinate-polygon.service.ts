import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CoordinatePolygonDto } from './dto/coordinate-polygon.dto';
import { JsonApiResponse } from '../models/json-api-response/json-api-response';

@Injectable()
export class CoordinatePolygonService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(
    coordinatePolygonDto: CoordinatePolygonDto,
  ): Promise<JsonApiResponse<CoordinatePolygonDto>> {
    const { geometry_uuid, coordinate_uuid, assignedBy } = coordinatePolygonDto;

    const geometry = await this.prismaService.geometry.findUnique({
      where: { uuid: geometry_uuid },
    });

    if (!geometry)
      new NotFoundException(`geometry with uuid ${geometry_uuid} not found`);

    const coordinate = await this.prismaService.coordinate.findUnique({
      where: { uuid: coordinate_uuid },
    });

    if (!coordinate)
      new NotFoundException(
        `coordinate with uuid ${coordinate_uuid} not found`,
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

  async findAll(): Promise<JsonApiResponse<CoordinatePolygonDto[]>> {
    const coordinatePolygons =
      await this.prismaService.coordinatePolygon.findMany({
        include: {
          geometry: {
            select: {
              uuid: true,
              name: true,
              type: true,
              reference: true,
            },
          },
          coordinate: {
            select: {
              uuid: true,
              latitude: true,
              longitude: true,
              isStop: true,
            },
          },
        },
      });
    return new JsonApiResponse<CoordinatePolygonDto[]>(
      HttpStatus.OK,
      'coordinate found',
      coordinatePolygons,
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
