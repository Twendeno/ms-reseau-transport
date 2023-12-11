import { Test, TestingModule } from '@nestjs/testing';
import { CoordinatePolygonService } from './coordinate-polygon.service';

describe('CoordinatePolygonService', () => {
  let service: CoordinatePolygonService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CoordinatePolygonService],
    }).compile();

    service = module.get<CoordinatePolygonService>(CoordinatePolygonService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
