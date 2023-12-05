import { IsNotEmpty, IsNumber, IsOptional, Max, Min } from "class-validator";

export class CoordinateDto {
  @IsNotEmpty()
  @IsNumber()
  @Min(-90)
  @Max(90)
  readonly latitude: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(-180)
  @Max(180)
  readonly longitude: number;

  @IsOptional()
  readonly isStop: boolean = false;

  @IsOptional()
  get latLng(): string {
    return [this.latitude, this.longitude].toString();
  }

}