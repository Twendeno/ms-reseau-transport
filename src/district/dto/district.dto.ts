import {
  IsJSON,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class DistrictDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    type: String,
    description: 'Name of district',
    required: true,
    example: 'Mahinga',
    default: 'Mahinga',
  })
  name: string;

  @IsNumber()
  @IsNotEmpty()
  @IsOptional()
  @ApiProperty({
    type: Number,
    description: 'Area of district',
    required: false,
    example: 100,
    default: 100,
  })
  area: number;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    type: String,
    description: 'uuid of department',
    required: true,
    example: 'uuid',
    default: 'uuid',
  })
  town_uuid: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    type: String,
    description: 'uuid of user',
    required: true,
    example: 'admin',
    default: 'admin',
  })
  assignedBy: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    type: String,
    description: 'uuid of last user',
    required: true,
    example: 'admin',
    default: 'admin',
  })
  lastModifiedBy: string;

  @IsNotEmpty()
  @IsJSON()
  @IsOptional()
  @ApiProperty({
    type: String,
    description: 'Geojson of department',
    required: true,
    example: '{"type":"LineString","coordinates":[[0,0],[1,1]]}',
    default: '{"type":"LineString","coordinates":[[0,0],[1,1]]}',
  })
  geodata: any;
}
