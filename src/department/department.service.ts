import {
  ConflictException,
  HttpStatus,
  Injectable,
  NotFoundException
} from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { JsonApiResponse } from "../models/json-api-response/json-api-response";
import { DepartmentDto } from "./dto/department.dto";
import { Util } from "../utils/util";

@Injectable()
export class DepartmentService {
  constructor(private readonly prismaService: PrismaService) {
  }

  async findAll(
    page: number,
    perPage: number
  ): Promise<JsonApiResponse<DepartmentDto[]>> {
    const skip = Number((page - 1) * perPage);
    const take = Number(perPage);
    const total = await this.prismaService.department.count();
    const meta = Util.getMetadata(total, page, perPage);

    const departments: DepartmentDto[] =
      await this.prismaService.department.findMany({
        skip,
        take,
        include: {
          _count: true
        }
      });
    return new JsonApiResponse<DepartmentDto[]>(
      HttpStatus.OK,
      "All departments",
      departments,
      meta
    );
  }

  async findOne(uuidOrName: string): Promise<JsonApiResponse<DepartmentDto>> {
    const department = await this.prismaService.department.findFirst({
      where: { OR: [{ uuid: uuidOrName }, { name: uuidOrName }] }
    });

    if (!department) throw new NotFoundException('Department not found');

    return new JsonApiResponse<DepartmentDto>(
      HttpStatus.OK,
      "Department founded",
      department
    );
  }

  async create(
    departmentDto: DepartmentDto
  ): Promise<JsonApiResponse<DepartmentDto>> {
    const { name, area, assignedBy, lastModifiedBy, geodata } = departmentDto;

    const department = await this.prismaService.department.findUnique({
      where: { name }
    });

    if (department) throw new ConflictException('Department already exists');

    const newDepartment = await this.prismaService.department.create({
      data: { name, area, geodata, assignedBy, lastModifiedBy }
    });

    return new JsonApiResponse<DepartmentDto>(
      HttpStatus.CREATED,
      "Department successfully created",
      newDepartment
    );
  }

  async update(
    uuid: string,
    departmentDto: DepartmentDto
  ): Promise<JsonApiResponse<DepartmentDto>> {
    const { name, area, assignedBy, lastModifiedBy, geodata } = departmentDto;

    const department = await this.prismaService.department.findUnique({
      where: { uuid }
    });

    if (!department) throw new NotFoundException('Department not found');

    const updatedDepartment = await this.prismaService.department.update({
      where: { uuid },
      data: { name, area, assignedBy, lastModifiedBy, geodata }
    });

    return new JsonApiResponse<DepartmentDto>(
      HttpStatus.OK,
      "Department successfully updated",
      updatedDepartment
    );
  }

  async delete(uuid: string): Promise<JsonApiResponse<DepartmentDto>> {
    const department = await this.prismaService.department.findUnique({
      where: { uuid }
    });

    if (!department) throw new NotFoundException('Department not found');

    const deletedDepartment = await this.prismaService.department.delete({
      where: { uuid }
    });

    return new JsonApiResponse<DepartmentDto>(
      HttpStatus.OK,
      "Department successfully deleted",
      deletedDepartment
    );
  }
}
