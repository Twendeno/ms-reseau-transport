import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class DepartmentDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsNumber()
  @IsOptional()
  area: number = 0;

  @IsNotEmpty()
  @IsString()
  geometry_uuid: string;


  @IsNotEmpty()
  @IsString()
  assignedBy: string;

  @IsNotEmpty()
  @IsString()
  lastModifiedBy: string;
}