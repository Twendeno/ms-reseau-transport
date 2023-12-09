import { IsEnum, IsNotEmpty, IsOptional } from "class-validator";
import { GeojsonType } from "../../models/geojson-api-response/geojson-api-response";

export class GeometryDto {
  @IsNotEmpty()
  @IsEnum(GeojsonType)
  @IsOptional()
  type: String = GeojsonType.LineString;

  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @IsOptional()
  reference: string;
}