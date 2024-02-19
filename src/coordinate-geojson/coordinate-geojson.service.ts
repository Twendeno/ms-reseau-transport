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
    isFeature: string = 'feature',
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

    return new Transformer(coordinates, type).transform(
      isFeature.toLowerCase().trim().toString(),
    );
  }

  async geojsonCollection() {
    const dataCollection = {
      type: 'FeatureCollection',
      features: [],
    };
    const geometries = await this.prismaService.geometry.findMany({
      select: {
        geodata: true,
        color: true,
        name: true,
      },
    });
    geometries.forEach((geometry) => {
      const geodata = JSON.parse(geometry.geodata.toString());
      let feature = null;
      if (Object.keys(geodata).includes('coordinates')) {
        feature = {
          type: 'Feature',
          geometry: geodata,
          properties: {
            name: geometry.name,
            color: geometry.color,
          },
        };
      }
      if (feature) {
        dataCollection.features.push(feature);
      }
    });

    return dataCollection;
  }

  async geojsonClusterStation() {
    const dataCluster = {
      type: 'FeatureCollection',
      features: [],
    };
    const stations = await this.prismaService.coordinate.findMany({
      select: { latitude: true, longitude: true, name: true },
      where: { isStop: true },
    });
    stations.forEach((station) => {
      dataCluster.features.push({
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [station.latitude, station.longitude],
        },
        properties: {
          name: station.name,
        },
      });
    });

    return dataCluster;
  }
}
