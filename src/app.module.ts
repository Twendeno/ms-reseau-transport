import { Module } from '@nestjs/common';
import { CoordinateModule } from './coordinate/coordinate.module';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { CoordinateGeojsonModule } from './coordinate-geojson/coordinate-geojson.module';
import { HealthModule } from './health/health.module';
import { GeometryModule } from './geometry/geometry.module';
import { CoordinatePolygonModule } from './coordinate-polygon/coordinate-polygon.module';
import { DepartmentModule } from './department/department.module';
import { TownModule } from './town/town.module';
import { DistrictModule } from './district/district.module';
import { SearchModule } from './search/search.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    CoordinateModule,
    PrismaModule,
    CoordinateGeojsonModule,
    HealthModule,
    GeometryModule,
    CoordinatePolygonModule,
    DepartmentModule,
    TownModule,
    DistrictModule,
    SearchModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
