import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ManyCoordinateDto {
  @IsOptional()
  @IsString()
  @ApiProperty({
    type: Array(Number),
    description: 'Coordinates',
    example: '[[48.856614,2.3522219]]',
    required: true,
    default: '[]',
  })
  coordinates: any;

  @IsOptional()
  @IsBoolean()
  @ApiProperty({
    type: Boolean,
    description: 'Is online',
    example: false,
    required: false,
    default: false,
  })
  isOnline: boolean = false;
  /*
  @IsOptional()
  @IsString()
  @ApiProperty({
    type: String,
    description: 'Direction name',
    example: 'Grand marche',
    required: false,
    default: 'Grand marche',
  })
  departure: string;

  @IsString()
  @IsOptional()
  @ApiProperty({
    type: String,
    description: 'Direction name',
    example: 'Centre ville ',
    required: false,
    default: 'Centre ville',
  })
  arrival: string;


  @IsNotEmpty()
  @IsOptional()
  @ApiProperty({
    type: String,
    description: 'Description of geometry',
    required: false,
  })
  reference: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    type: String,
    description: 'uuid of geometry',
    required: true,
  })
  geometry_uuid: string;


  @IsNotEmpty()
  @IsString()
  @ApiProperty({ type: String, description: 'uuid of user', required: true })
  assignedBy: string;*/
}
