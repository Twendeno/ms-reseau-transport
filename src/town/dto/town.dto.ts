import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class TownDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @IsNotEmpty()
  @IsOptional()
  area: number;

  @IsString()
  @IsNotEmpty()
  coordinate_uuid: string;

  @IsString()
  @IsNotEmpty()
  department_uuid: string;

  @IsString()
  @IsNotEmpty()
  geometry_uuid: string;

  @IsString()
  @IsNotEmpty()
  assignedBy: string;

  @IsString()
  @IsNotEmpty()
  lastModifiedBy: string;
}