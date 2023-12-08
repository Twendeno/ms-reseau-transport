import { Test, TestingModule } from '@nestjs/testing';
import { CoordinateGeojsonService } from './coordinate-geojson.service';
import { PrismaService } from "../prisma/prisma.service";

describe('CoordinateGeojsonService', () => {
  let service: CoordinateGeojsonService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CoordinateGeojsonService,{ provide: PrismaService, useValue: jest.fn() }],
    }).compile();

    service = module.get<CoordinateGeojsonService>(CoordinateGeojsonService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
