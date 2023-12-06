import { Test, TestingModule } from '@nestjs/testing';
import { CoordinateGeojsonController } from './coordinate-geojson.controller';

describe('CoordinateGeojsonController', () => {
  let controller: CoordinateGeojsonController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CoordinateGeojsonController],
    }).compile();

    controller = module.get<CoordinateGeojsonController>(CoordinateGeojsonController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
