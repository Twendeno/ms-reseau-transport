import {
  ConflictException,
  HttpStatus,
  Injectable,
  NotFoundException
} from "@nestjs/common";
import { CoordinateDto } from "./dto/coordinate.dto";
import { PrismaService } from "../prisma/prisma.service";
import { JsonApiResponse } from "../models/json-api-response/json-api-response";
import { Util } from "../utils/util";
import { RandomValueGenerator } from "../models/random-value-generator/random-value-generator";

@Injectable()
export class CoordinateService {
  constructor(private readonly prismaService: PrismaService) {
  }

  async create(
    coordinateDto: CoordinateDto
  ): Promise<JsonApiResponse<CoordinateDto>> {
    const { latitude, longitude, isStop, name, address } = coordinateDto;
    const latLng = [latitude, longitude].toString();

    const coordinate = await this.prismaService.coordinate.findUnique({
      where: { latLng }
    });

    if (coordinate) throw new ConflictException("Coordinate already exists");

    const newCoordinate = await this.prismaService.coordinate.create({
      data: { latitude, longitude, latLng, name, address, isStop }
    });

    return new JsonApiResponse<CoordinateDto>(
      HttpStatus.CREATED,
      "Coordinate successfully created",
      newCoordinate
    );
  }

  async findAll(
    page: number,
    perPage: number
  ): Promise<JsonApiResponse<CoordinateDto[]>> {
    const skip = Number((page - 1) * perPage);
    const take = Number(perPage);
    const total = await this.prismaService.coordinate.count();
    const meta = Util.getMetadata(total, page, perPage);

    const coordinates = await this.prismaService.coordinate.findMany({
      skip,
      take,
      include: { geometry: { select: { geometry_uuid: true } }, _count: true }
    });

    return new JsonApiResponse<CoordinateDto[]>(
      HttpStatus.OK,
      "All coordinate founded",
      coordinates,
      meta
    );
  }

  async findOne(uuid: string): Promise<JsonApiResponse<CoordinateDto>> {
    const coordinate = await this.prismaService.coordinate.findUnique({
      where: { uuid },
      include: { geometry: true }
    });

    if (!coordinate) throw new NotFoundException("Coordinate not found");

    return new JsonApiResponse<CoordinateDto>(
      HttpStatus.OK,
      "Coordinate founded",
      coordinate
    );
  }

  async update(
    uuid: string,
    coordinateDto: CoordinateDto
  ): Promise<JsonApiResponse<CoordinateDto>> {
    const { latitude, longitude, name, address, isStop } = coordinateDto;
    const latLng = [latitude, longitude].toString();

    // Check if the coordinate exists
    const coordinate = await this.prismaService.coordinate.findUnique({
      where: { uuid }
    });

    if (!coordinate) throw new NotFoundException("Coordinate not found");

    // Update the coordinate
    const updatedCoordinate = await this.prismaService.coordinate.update({
      where: { uuid },
      data: { latitude, longitude, latLng, name, address, isStop }
    });

    return new JsonApiResponse<CoordinateDto>(
      HttpStatus.OK,
      "Coordinate successfully updated",
      updatedCoordinate
    );
  }

  async delete(uuid: string): Promise<JsonApiResponse<CoordinateDto>> {
    const coordinate = await this.prismaService.coordinate.findUnique({
      where: { uuid }
    });

    if (!coordinate) throw new NotFoundException("Coordinate not found");

    await this.prismaService.coordinate.delete({
      where: { uuid }
    });

    return new JsonApiResponse<CoordinateDto>(
      HttpStatus.OK,
      "Coordinate successfully deleted",
      coordinate
    );
  }

  // create many coordinates at once with array of coordinates
  async createMany(coordinates: number[][]) {
    const name = RandomValueGenerator.generateRandomAlphaNumeric(10);
    await this.prismaService.$transaction(async (prisma) => {
      let i = 1;
      for (const [longitude, latitude] of coordinates) {
        let latLng = [latitude, longitude].toString();
        let coordinate = { latitude, longitude, isStop: false, name: `${name}_`+ i, address: "address_" + i, latLng };
        await this.create(coordinate);
        i++;
      }
    });
  }


  async findOneByLatLng(latLng: string): Promise<JsonApiResponse<CoordinateDto>> {

    const coordinate = await this.prismaService.coordinate.findUnique({
      where: { latLng },
    });

    if (!coordinate) throw new NotFoundException("Coordinate not found");

    return new JsonApiResponse<CoordinateDto>(
      HttpStatus.OK,
      "Coordinate founded",
      coordinate
    );
  }
}
