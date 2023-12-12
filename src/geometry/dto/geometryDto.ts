import { IsEnum, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { GeojsonType } from "../../models/geojson-api-response/geojson-api-response";
import { ApiProperty } from "@nestjs/swagger";

export class GeometryDto {
  @IsNotEmpty()
  @IsEnum(GeojsonType)
  @IsOptional()
  @ApiProperty({ type: String, description: 'Type of geometry', example: GeojsonType.LineString, required: false, enum: GeojsonType })
  type: String = GeojsonType.LineString;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ type: String, description: 'Name of geometry', example: 'Line 3', required: true })
  name: string;

  @IsNotEmpty()
  @IsOptional()
  @ApiProperty({ type: String, description: 'Description of geometry', required: false })
  reference: string;
}