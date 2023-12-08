import { ConflictException, HttpStatus, Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { GeometryDto } from "./dto/geometryDto";
import { JsonApiResponse } from "../models/json-api-response/json-api-response";
import { RandomValueGenerator } from "../models/random-value-generator/random-value-generator";

@Injectable()
export class GeometryService {
  constructor(private readonly prismaService:PrismaService){}

  async create(geometryDto:GeometryDto): Promise<JsonApiResponse<GeometryDto>> {
    geometryDto.reference =  RandomValueGenerator.generateRandomAlphaNumeric(10);
    const { name,reference, type } = geometryDto;

    const geometry = await this.prismaService.geometry.findUnique({
      where: { reference, name }
    });

    if (geometry) throw new ConflictException('Geometry already exists');

    const newGeometry = await this.prismaService.geometry.create({
      data: { name, reference, type }
    });

    return new JsonApiResponse<GeometryDto>(HttpStatus.CREATED,"Geometry successfully created",newGeometry);
  }

  async findAll(): Promise<JsonApiResponse<GeometryDto[]>> {
    const geometries = await this.prismaService.geometry.findMany();

    return new JsonApiResponse<GeometryDto[]>(HttpStatus.OK,"All geometry founded",geometries);
  }

  async findOne(uuid: string): Promise<JsonApiResponse<GeometryDto>> {
    const geometry = await this.prismaService.geometry.findUnique({
      where: { uuid }
    });

    if (!geometry) throw new NotFoundException('Geometry not found');

    return new JsonApiResponse<GeometryDto>(HttpStatus.OK,"Geometry founded",geometry);
  }

  async update(uuid: string, geometryDto: GeometryDto): Promise<JsonApiResponse<GeometryDto>> {
    const { name,  type } = geometryDto;

    // Check if the geometry exists
    const geometry = await this.prismaService.geometry.findUnique({
      where: { uuid }
    });

    if (!geometry) throw new NotFoundException('Geometry not found');

    const updatedGeometry = await this.prismaService.geometry.update({
      where: { uuid },
      data: { name, type }
    });

    return new JsonApiResponse<GeometryDto>(HttpStatus.OK,"Geometry successfully updated",updatedGeometry);
  }

  async delete(uuid: string): Promise<JsonApiResponse<GeometryDto>> {
    const geometry = await this.prismaService.geometry.findUnique({
      where: { uuid }
    });

    if (!geometry) throw new NotFoundException('Geometry not found');

    await this.prismaService.geometry.delete({
      where: { uuid }
    });

    return new JsonApiResponse<GeometryDto>(HttpStatus.OK,"Geometry successfully deleted",geometry);
  }

  async findGeometryByReference(reference: string): Promise<JsonApiResponse<GeometryDto>> {
    const geometry = await this.prismaService.geometry.findUnique({
      where: { reference }
    });

    if (!geometry) throw new NotFoundException('Geometry not found');

    return new JsonApiResponse<GeometryDto>(HttpStatus.OK,"Geometry founded",geometry);
  }

}
