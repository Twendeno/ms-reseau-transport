import { IsEnum, IsNotEmpty, IsOptional } from "class-validator";
import { Nature } from "@prisma/client";

export class GeometryDto {
  @IsNotEmpty()
  @IsEnum(Nature)
  @IsOptional()
  type: Nature = Nature.LineString;

  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @IsOptional()
  reference: string;
}