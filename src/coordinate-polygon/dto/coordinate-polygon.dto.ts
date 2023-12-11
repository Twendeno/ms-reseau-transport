import { IsNotEmpty } from "class-validator";

export class CoordinatePolygonDto{
  @IsNotEmpty()
  geometry_uuid: string;
  @IsNotEmpty()
  coordinate_uuid: string;
  @IsNotEmpty()
  assignedBy: string;
}