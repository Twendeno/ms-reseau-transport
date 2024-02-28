import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CoordinatePolygonDto {
  @IsOptional()
  @IsString()
  @ApiProperty({
    type: String,
    description: 'Direction name',
    example: 'Grand marche - Centre ville ',
    required: false,
    default: 'Grand marche - Centre ville',
  })
  name: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    type: String,
    description: 'Direction name',
    example: 'Grand marche',
    required: true,
    default: 'Grand marche',
  })
  readonly departure: string;

  @IsString()
  @ApiProperty({
    type: String,
    description: 'Direction name',
    example: 'Centre ville ',
    required: true,
    default: 'Centre ville',
  })
  readonly arrival: string;

  @IsOptional()
  @IsBoolean()
  @ApiProperty({
    type: Boolean,
    description: 'Is online',
    example: false,
    required: false,
    default: false,
  })
  readonly isOnline: boolean = false;

  @IsNotEmpty()
  @IsOptional()
  @ApiProperty({
    type: String,
    description: 'Description of geometry',
    required: false,
    example: 'WKGKUYQL',
    default: 'WKGKUYQL',
  })
  reference: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    type: String,
    description: 'uuid of geometry',
    required: true,
    example: 'uuid',
    default: 'uuid',
  })
  geometry_uuid: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    type: String,
    description: 'uuid of coordinate',
    required: true,
    example: 'uuid',
    default: 'uuid',
  })
  coordinate_uuid: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    type: String,
    description: 'uuid of user',
    required: true,
    example: 'uuid',
    default: 'uuid',
  })
  assignedBy: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    type: String,
    description: 'uuid of departure coordinate',
    required: true,
    example: 'uuid',
    default: 'NULL',
  })
  departure_coordinate_uuid: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    type: String,
    description: 'uuid of arrival coordinate',
    required: true,
    example: 'uuid',
    default: 'NULL',
  })
  arrival_coordinate_uuid: string;
}
