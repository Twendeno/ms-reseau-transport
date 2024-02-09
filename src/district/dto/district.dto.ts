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
  })
  name: string;

  @IsNumber()
  @IsNotEmpty()
  @IsOptional()
  @ApiProperty({
    type: Number,
    description: 'Area of district',
    required: false,
  })
  area: number;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    type: String,
    description: 'uuid of department',
    required: true,
  })
  town_uuid: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ type: String, description: 'uuid of user', required: true })
  assignedBy: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    type: String,
    description: 'uuid of last user',
    required: true,
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
  })
  geodata: any;
}
