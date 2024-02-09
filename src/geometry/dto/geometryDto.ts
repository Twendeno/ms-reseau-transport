import {
  IsEnum,
  IsJSON,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Util } from '../../utils/util';
import { GeojsonType } from "../../models/geojson-api-response/geojson-api-response";

export class GeometryDto {

  @IsNotEmpty()
  @IsEnum(GeojsonType)
  @IsOptional()
  @ApiProperty({
    type: String,
    description: 'Type of geometry',
    example: GeojsonType.LineString,
    required: false,
    enum: GeojsonType,
  })
  type: String = GeojsonType.LineString;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    type: String,
    description: 'Name of geometry',
    example: 'Line 3',
    required: true,
  })
  name: string;

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
    description: 'Color of geometry',
    example: '#000000',
    required: true,
  })
  color: string = Util.generateNewColor();

  @IsNotEmpty()
  @IsJSON()
  @IsOptional()
  @ApiProperty({
    type: String,
    description: 'Geojson of geometry',
    required: true,
    example: '{"type":"LineString","coordinates":[[0,0],[1,1]]}',
  })
  geodata: any;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    type: String,
    description: 'uuid of department',
    required: true,
  })
  department_uuid: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    type: String,
    description: 'uuid of town',
    required: true,
  })
  town_uuid: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ type: String, description: 'uuid of user', required: true })
  assignedBy: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    type: String,
    description: 'uuid of last user',
    required: true,
  })
  lastModifiedBy: string;
}
