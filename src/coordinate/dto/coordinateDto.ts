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

export class CoordinateDto {
  @IsNotEmpty()
  @IsNumber()
  @Min(-90)
  @Max(90)
  @IsLatitude()
  readonly latitude: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(-180)
  @Max(180)
  @IsLongitude()
  readonly longitude: number;

  @IsOptional()
  @IsBoolean()
  readonly isStop: boolean = false;

  @IsOptional()
  @IsLatLong()
  get latLng(): string {
    return [this.latitude, this.longitude].toString();
  }

}