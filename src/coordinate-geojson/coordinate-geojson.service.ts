import { Injectable, NotFoundException } from "@nestjs/common";
import {
  GeojsonApiResponse,
  GeojsonType,
  LineString, MultiLineString,
  MultiPoint, MultiPolygon,
  Point, Polygon
} from "../geojson-api-response/geojson-api-response";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class CoordinateGeojsonService {
  constructor(private readonly prismaService:PrismaService) {}


  async geojsonPoint(uuid: string): Promise<Point> {
    const coordinate = await this.prismaService.coordinate.findUnique({
      where: { uuid },
      select: { latitude: true, longitude: true }
    });

    if (!coordinate) throw new NotFoundException('Coordinate not found');

    return new Point(GeojsonType.Point, [coordinate.latitude, coordinate.longitude]);
  }

  async geojsonMultiPoint(): Promise<MultiPoint> {
    const coordinates = await this.prismaService.coordinate.findMany({
      select: { latitude: true, longitude: true }
    });

    return new MultiPoint(
      GeojsonType.MultiPoint,
     coordinates.map(coordinate => [coordinate.latitude, coordinate.longitude]));
  }

  async geojsonLineString(): Promise<LineString> {
    const coordinate = await this.prismaService.coordinate.findMany({
      select: { latitude: true, longitude: true }
    });

    return new LineString(GeojsonType.LineString, coordinate.map(coordinate => [coordinate.latitude, coordinate.longitude]));
  }

  async geojsonMultiLineString(): Promise<MultiLineString> {
    const coordinate = await this.prismaService.coordinate.findMany({
      select: { latitude: true, longitude: true }
    });

    return new MultiLineString(GeojsonType.MultiLineString, [coordinate.map(coordinate => [coordinate.latitude, coordinate.longitude])]);
  }

  async geojsonPolygon(): Promise<Polygon> {
    const coordinate = await this.prismaService.coordinate.findMany({
      select: { latitude: true, longitude: true }
    });

    return new Polygon(GeojsonType.Polygon, [
        coordinate.map(coordinate => [coordinate.latitude, coordinate.longitude])
      ]
    );
  }

  async geojsonMultiPolygon(): Promise<MultiPolygon> {
    const coordinate = await this.prismaService.coordinate.findMany({
      select: { latitude: true, longitude: true }
    });

    return new MultiPolygon(GeojsonType.MultiPolygon, [
        [
          coordinate.map(coordinate => [coordinate.latitude, coordinate.longitude])
        ]
      ]
    );

  }
}
