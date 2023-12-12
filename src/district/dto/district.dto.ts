import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class DistrictDto {

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @IsNotEmpty()
  @IsOptional()
  area: number;

  @IsString()
  @IsNotEmpty()
  town_uuid: string;

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