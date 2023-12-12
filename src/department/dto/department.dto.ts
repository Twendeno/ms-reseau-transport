import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class DepartmentDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ type: String, description: 'Name of department', required: true })
  name: string;

  @IsNotEmpty()
  @IsNumber()
  @IsOptional()
  @ApiProperty({ type: Number, description: 'Area of department', required: false })
  area: number = 0;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ type: String, description: 'uuid of geometry', required: true })
  geometry_uuid: string;


  @IsNotEmpty()
  @IsString()
  @ApiProperty({ type: String, description: 'uuid of user', required: true })
  assignedBy: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ type: String, description: 'uuid of last user', required: true })
  lastModifiedBy: string;
}