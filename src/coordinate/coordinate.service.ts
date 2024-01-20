import {
  ConflictException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CoordinateDto } from './dto/coordinate.dto';
import { PrismaService } from '../prisma/prisma.service';
import { JsonApiResponse } from '../models/json-api-response/json-api-response';

@Injectable()
export class CoordinateService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(
    coordinateDto: CoordinateDto,
  ): Promise<JsonApiResponse<CoordinateDto>> {
    const { latitude, longitude, isStop, name, address } = coordinateDto;
    const latLng = [latitude, longitude].toString();

    const coordinate = await this.prismaService.coordinate.findUnique({
      where: { latLng },
    });

    if (coordinate) throw new ConflictException('Coordinate already exists');

    const newCoordinate = await this.prismaService.coordinate.create({
      data: { latitude, longitude, latLng, name, address, isStop },
    });

    return new JsonApiResponse<CoordinateDto>(
      HttpStatus.CREATED,
      'Coordinate successfully created',
      newCoordinate,
    );
  }

  async findAll(): Promise<JsonApiResponse<CoordinateDto[]>> {
    const coordinates = await this.prismaService.coordinate.findMany({
      include: { geometry: true },
    });

    return new JsonApiResponse<CoordinateDto[]>(
      HttpStatus.OK,
      'All coordinate founded',
      coordinates,
    );
  }

  async findOne(uuid: string): Promise<JsonApiResponse<CoordinateDto>> {
    const coordinate = await this.prismaService.coordinate.findUnique({
      where: { uuid },
      include: { geometry: true },
    });

    if (!coordinate) throw new NotFoundException('Coordinate not found');

    return new JsonApiResponse<CoordinateDto>(
      HttpStatus.OK,
      'Coordinate founded',
      coordinate,
    );
  }

  async update(
    uuid: string,
    coordinateDto: CoordinateDto,
  ): Promise<JsonApiResponse<CoordinateDto>> {
    const { latitude, longitude, name, address, isStop } = coordinateDto;
    const latLng = [latitude, longitude].toString();

    // Check if the coordinate exists
    const coordinate = await this.prismaService.coordinate.findUnique({
      where: { uuid },
    });

    if (!coordinate) throw new NotFoundException('Coordinate not found');

    // Check if the new latLng is already in use
    const coordinateLatlng = await this.prismaService.coordinate.findUnique({
      where: { latLng },
    });

    if (coordinateLatlng)
      throw new ConflictException('Coordinate already exists');

    // Update the coordinate
    const updatedCoordinate = await this.prismaService.coordinate.update({
      where: { uuid },
      data: { latitude, longitude, latLng, name, address, isStop },
    });

    return new JsonApiResponse<CoordinateDto>(
      HttpStatus.OK,
      'Coordinate successfully updated',
      updatedCoordinate,
    );
  }

  async delete(uuid: string): Promise<JsonApiResponse<CoordinateDto>> {
    const coordinate = await this.prismaService.coordinate.findUnique({
      where: { uuid },
    });

    if (!coordinate) throw new NotFoundException('Coordinate not found');

    await this.prismaService.coordinate.delete({
      where: { uuid },
    });

    return new JsonApiResponse<CoordinateDto>(
      HttpStatus.OK,
      'Coordinate successfully deleted',
      coordinate,
    );
  }
}
