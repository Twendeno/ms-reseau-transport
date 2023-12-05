import { Test, TestingModule } from '@nestjs/testing';
import { CoordinateController } from './coordinate.controller';

describe('CoordinateController', () => {
  let controller: CoordinateController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CoordinateController],
    }).compile();

    controller = module.get<CoordinateController>(CoordinateController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
