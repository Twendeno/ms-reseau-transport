import { Module } from '@nestjs/common';
import { GeometryController } from './geometry.controller';
import { GeometryService } from './geometry.service';

@Module({
  controllers: [GeometryController],
  providers: [GeometryService],
})
export class GeometryModule {}
