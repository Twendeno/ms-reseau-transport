import {
  IsBoolean,
  IsLatitude,
  IsLatLong,
  IsLongitude,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  Max,
  Min
} from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CoordinateDto {
  @IsNotEmpty()
  @IsNumber()
  @Min(-90)
  @Max(90)
  @IsLatitude()
  @ApiProperty({ type: Number, description: 'Latitude',example: 48.856614, required: true })
  readonly latitude: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(-180)
  @Max(180)
  @IsLongitude()
  @ApiProperty({ type: Number, description: 'Longitude',example: 2.3522219, required: true })
  readonly longitude: number;

  @IsOptional()
  @IsBoolean()
  @ApiProperty({ type: Boolean, description: 'Is stop',example: false, required: false })
  readonly isStop: boolean = false;

  @IsOptional()
  @IsLatLong()
  @ApiProperty({ type: String, description: 'Latitude and longitude',example: '48.856614,2.3522219', required: false })
  get latLng(): string {
    return [this.latitude, this.longitude].toString();
  }

}