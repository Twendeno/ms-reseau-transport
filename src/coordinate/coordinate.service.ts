import {
  ConflictException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CoordinateDto } from './dto/coordinate.dto';
import { PrismaService } from '../prisma/prisma.service';
import { JsonApiResponse } from '../models/json-api-response/json-api-response';
import { Util } from '../utils/util';
import { RandomValueGenerator } from '../models/random-value-generator/random-value-generator';
import { CoordinateEntity } from './models/coordinate.entity';
import { CreateManyCoordinateDto } from './dto/create-many-coordinate.dto';

@Injectable()
export class CoordinateService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(
    coordinateDto: CoordinateDto,
  ): Promise<JsonApiResponse<CoordinateEntity>> {
    const {
      latitude,
      longitude,
      isStop,
      name,
      address,
      isArrival,
      isDeparture,
    } = coordinateDto;
    const latLng = [latitude, longitude].toString();

    const coordinate = await this.prismaService.coordinate.findUnique({
      where: { latLng },
    });

    if (coordinate) throw new ConflictException('Coordinate already exists');

    const newCoordinate = await this.prismaService.coordinate.create({
      data: {
        latitude,
        longitude,
        latLng,
        name,
        address,
        isStop,
        isArrival,
        isDeparture,
      },
    });

    return new JsonApiResponse<CoordinateEntity>(
      HttpStatus.CREATED,
      'Coordinate successfully created',
      newCoordinate,
    );
  }

  async findAll(): Promise<JsonApiResponse<CoordinateEntity[]>> {
    let args: any = {
      include: { geometry: { select: { geometry_uuid: true } }, _count: true },
    };

    const coordinates = await this.prismaService.coordinate.findMany(args);

    return new JsonApiResponse<CoordinateEntity[]>(
      HttpStatus.OK,
      'All coordinate founded',
      coordinates,
    );
  }

  async findAllPaginate(
    page: number,
    perPage: number,
  ): Promise<JsonApiResponse<CoordinateEntity[]>> {
    const skip = Number((page - 1) * perPage);
    const take = Number(perPage);
    const total = await this.prismaService.coordinate.count();
    const meta = Util.getMetadata(total, page, perPage);

    let args: any = {
      skip,
      take,
      include: { geometry: { select: { geometry_uuid: true } }, _count: true },
    };

    const coordinates = await this.prismaService.coordinate.findMany(args);

    return new JsonApiResponse<CoordinateEntity[]>(
      HttpStatus.OK,
      'All coordinate founded',
      coordinates,
      meta,
    );
  }

  async findOne(uuid: string): Promise<JsonApiResponse<CoordinateEntity>> {
    const coordinate = await this.prismaService.coordinate.findUnique({
      where: { uuid },
      include: { geometry: true },
    });

    if (!coordinate) throw new NotFoundException('Coordinate not found');

    return new JsonApiResponse<CoordinateEntity>(
      HttpStatus.OK,
      'Coordinate founded',
      coordinate,
    );
  }

  async update(
    uuid: string,
    coordinateDto: CoordinateDto,
  ): Promise<JsonApiResponse<CoordinateEntity>> {
    const {
      latitude,
      longitude,
      name,
      address,
      isStop,
      isDeparture,
      isArrival,
    } = coordinateDto;
    const latLng = [latitude, longitude].toString();

    // Check if the coordinate exists
    const coordinate = await this.prismaService.coordinate.findUnique({
      where: { uuid },
    });

    if (!coordinate) throw new NotFoundException('Coordinate not found');

    // Update the coordinate
    const updatedCoordinate = await this.prismaService.coordinate.update({
      where: { uuid },
      data: {
        latitude,
        longitude,
        latLng,
        name,
        address,
        isStop,
        isDeparture,
        isArrival,
      },
    });

    return new JsonApiResponse<CoordinateEntity>(
      HttpStatus.OK,
      'Coordinate successfully updated',
      updatedCoordinate,
    );
  }

  async delete(uuid: string): Promise<JsonApiResponse<CoordinateEntity>> {
    const coordinate = await this.prismaService.coordinate.findUnique({
      where: { uuid },
    });

    if (!coordinate) throw new NotFoundException('Coordinate not found');

    await this.prismaService.coordinate.delete({
      where: { uuid },
    });

    return new JsonApiResponse<CoordinateEntity>(
      HttpStatus.OK,
      'Coordinate successfully deleted',
      coordinate,
    );
  }

  async deleteMany(coordinateEntity: CoordinateEntity[]) {
    try {
      await this.prismaService.$transaction(async (prisma) => {
        for (const { uuid } of coordinateEntity) {
          await this.delete(uuid);
        }
      });
    } catch (error) {
      throw new Error(`error`);
    }
  }

  // create many coordinates at once with array of coordinates
  async createMany(coordinates: CreateManyCoordinateDto[], data: any) {
    const name = RandomValueGenerator.generateRandomAlphaNumeric(10);
    data.departure = `${name}-A`;
    data.arrival = `${name}-B`;
    data.isOnline = false;

    const { geometry_uuid, assignedBy, departure, arrival, isOnline } = data;

    try {
      await this.prismaService.$transaction(async (prismaClient) => {
        // Enregistrez les coordonnées dans la table coordinate
        const coordinateRecords = await Promise.all(
          coordinates.map((value, index, array) => {
            const [latitude, longitude] = value.coordinate;
            const nameByStation = value.name;

            return prismaClient.coordinate.create({
              data: {
                latitude,
                longitude,
                latLng: `${latitude},${longitude}`,
                name: nameByStation,
                address: `address of ${nameByStation}`,
                isStop: false,
              },
            });
          }),
        );

        // Récupérez les UUID des coordonnées enregistrées
        const coordinateUuids = coordinateRecords.map((record) => record.uuid);

        // Enregistrez les liens entre les coordonnées et la géométrie dans la table coordinate-geometry
        await Promise.all(
          coordinateUuids.map((coordinate_uuid) => {
            const reference =
              RandomValueGenerator.generateRandomAlphaNumeric(12);

            return prismaClient.coordinatePolygon.create({
              data: {
                geometry_uuid,
                coordinate_uuid,
                assignedBy,
                departure,
                arrival,
                isOnline,
                name: `${data.departure} - ${data.arrival}`,
                reference,
              },
            });
          }),
        );
      });
    } catch (error) {
      // Gérer les erreurs de la transaction
      throw new Error(`${error}`);
    }
  }

  async findOneByLatLng(
    latLng: string,
  ): Promise<JsonApiResponse<CoordinateEntity>> {
    const coordinate = await this.prismaService.coordinate.findUnique({
      where: { latLng },
    });

    if (!coordinate) throw new NotFoundException('Coordinate not found');

    return new JsonApiResponse<CoordinateEntity>(
      HttpStatus.OK,
      'Coordinate founded',
      coordinate,
    );
  }
}
