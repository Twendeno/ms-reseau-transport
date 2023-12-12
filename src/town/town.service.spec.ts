import { Test, TestingModule } from '@nestjs/testing';
import { TownService } from './town.service';

describe('TownService', () => {
  let service: TownService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TownService],
    }).compile();

    service = module.get<TownService>(TownService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
