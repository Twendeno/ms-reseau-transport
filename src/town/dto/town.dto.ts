import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class TownDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ type: String, description: 'Name of town', required: true })
  name: string;

  @IsNumber()
  @IsNotEmpty()
  @IsOptional()
  @ApiProperty({ type: Number, description: 'Area of town', required: false })
  area: number;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ type: String, description: 'uuid of district', required: true })
  coordinate_uuid: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ type: String, description: 'uuid of department', required: true })
  department_uuid: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ type: String, description: 'uuid of district', required: true })
  geometry_uuid: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ type: String, description: 'uuid of user', required: true })
  assignedBy: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ type: String, description: 'uuid of last user', required: true })
  lastModifiedBy: string;
}