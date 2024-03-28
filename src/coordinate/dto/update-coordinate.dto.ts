import {
  IsBoolean,
  IsLatitude,
  IsLatLong,
  IsLongitude,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  Min,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateCoordinateDto {

  @IsOptional()
  @Min(-90)
  @Max(90)
  @IsLatitude()
  @ApiProperty({
    type: Number,
    description: 'Latitude',
    example: 48.856614,
    required: false,
  })
  readonly latitude: number = 0;

  @IsOptional()
  @Min(-180)
  @Max(180)
  @IsLongitude()
  @ApiProperty({
    type: Number,
    description: 'Longitude',
    example: 2.3522219,
    required: false,
  })
  readonly longitude: number = 0;

  @IsOptional()
  @IsBoolean()
  @ApiProperty({
    type: Boolean,
    description: 'Is stop',
    example: false,
    required: false,
    default: false,
  })
  readonly isStop: boolean = false;

  @IsOptional()
  @IsLatLong()
  @ApiProperty({
    type: String,
    description: 'Latitude and longitude',
    example: '48.856614,2.3522219',
    required: false,
  })
  get latLng(): string {
    return [this.latitude, this.longitude].toString();
  }

  @IsOptional()
  @IsString({ message: 'Please Enter Valid Name' })
  @ApiProperty({
    type: String,
    description: 'Stop name',
    example: 'Sonko',
    required: false,
  })
  readonly name: string;

  @IsOptional()
  @IsString()
  @IsString({ message: 'Please Enter Valid Name' })
  @ApiProperty({
    type: String,
    description: 'address',
    example: 'Boulevard du General de Gaulle',
    required: false,
  })
  readonly address: string;

  @IsOptional()
  @IsBoolean()
  @ApiProperty({
    type: Boolean,
    description: 'Is arrival',
    example: false,
    required: false,
    default: false,
  })
  readonly isArrival: boolean = false;

  @IsOptional()
  @IsBoolean()
  @ApiProperty({
    type: Boolean,
    description: 'Is departure',
    example: false,
    required: false,
    default: false,
  })
  readonly isDeparture: boolean = false;
}
