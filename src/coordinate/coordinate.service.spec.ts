import { Test, TestingModule } from '@nestjs/testing';
import { CoordinateService } from './coordinate.service';

describe('CoordinateService', () => {
  let service: CoordinateService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CoordinateService],
    }).compile();

    service = module.get<CoordinateService>(CoordinateService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
