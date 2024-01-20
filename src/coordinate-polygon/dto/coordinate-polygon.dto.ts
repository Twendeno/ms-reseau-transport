import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CoordinatePolygonDto {
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
  @ApiProperty({
    type: String,
    description: 'uuid of coordinate',
    required: true,
  })
  coordinate_uuid: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ type: String, description: 'uuid of user', required: true })
  assignedBy: string;
}
