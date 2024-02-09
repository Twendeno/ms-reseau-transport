import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Transformer } from '../models/transformer/transformer';
import { GeojsonType } from '../models/geojson-api-response/geojson-api-response';
import { isBoolean } from 'class-validator';

@Injectable()
export class CoordinateGeojsonService {
  constructor(private readonly prismaService: PrismaService) {}

  async geojsonByTypeGeometryUuid(
    uuidOrRefOrName: string,
    type: string = GeojsonType.LineString,
    isStop: boolean,
    isFeature: boolean
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
            coordinate: { isStop: !Boolean(isStop) },
          },
        ],
      },
      select: {
        coordinate: {
          select: {
            latitude: true,
            longitude: true,
            name: true,
            address: true,
          },
        },
      },
    });

    if (!coordinates) throw new NotFoundException('Data not found');

    return new Transformer(coordinates, type).transform(isFeature);
  }
}
