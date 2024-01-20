import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Transformer } from '../models/transformer/transformer';
import { GeojsonType } from '../models/geojson-api-response/geojson-api-response';

@Injectable()
export class CoordinateGeojsonService {
  constructor(private readonly prismaService: PrismaService) {}

  async geojsonByTypeGeometryUuid(
    uuidOrRefOrName: string,
    type: string = GeojsonType.LineString,
    isStop: boolean = false,
  ) {
    const coordinates = await this.prismaService.coordinatePolygon.findMany({
      where: {
        OR: [
          {
            geometry: { uuid: uuidOrRefOrName },
          },
          {
            geometry: { reference: uuidOrRefOrName },
          },
          {
            geometry: { name: uuidOrRefOrName },
          },
        ],
        AND: [
          {
            geometry: { type },
          },
          {
            coordinate: { isStop: isStop },
          },
        ],
      },
      select: {
        coordinate: {
          select: {
            latitude: true,
            longitude: true,
          },
        },
      },
    });

    if (!coordinates) throw new NotFoundException('Data not found');

    return new Transformer(coordinates, type).transform();
  }
}
