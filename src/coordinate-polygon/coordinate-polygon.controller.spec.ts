import { Test, TestingModule } from '@nestjs/testing';
import { CoordinatePolygonController } from './coordinate-polygon.controller';
import { CoordinatePolygonService } from './coordinate-polygon.service';
import { CoordinatePolygonServiceMock } from './mocks/coordinate-polygon.service.mock';
import { coordinatePolygonModelMock } from './mocks/coordinate-polygon.model.mock';

describe('CoordinatePolygonController', () => {
  let controller: CoordinatePolygonController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CoordinatePolygonController],
      providers: [
        {
          provide: CoordinatePolygonService,
          useClass: CoordinatePolygonServiceMock,
        },
      ],
    }).compile();

    controller = module.get<CoordinatePolygonController>(
      CoordinatePolygonController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of coordinatePolygon', () => {
      expect(controller.findAll()).resolves.toEqual(coordinatePolygonModelMock);
    });
  });

  describe('findOne', () => {
    it('should return a coordinatePolygon', () => {
      expect(controller.findOne('1')).resolves.toEqual(
        coordinatePolygonModelMock[0],
      );
    });
  });

  describe('create', () => {
    it('should return a coordinatePolygon', () => {
      expect(controller.create(coordinatePolygonModelMock[0])).resolves.toEqual(
        { message: 'coordinatePolygon created' },
      );
    });
  });

  describe('update', () => {
    it('should return a coordinatePolygon', () => {
      expect(
        controller.update('1', coordinatePolygonModelMock[0]),
      ).resolves.toEqual({ message: 'coordinatePolygon updated' });
    });
  });

  describe('delete', () => {
    it('should return a coordinatePolygon', () => {
      expect(controller.delete('1')).resolves.toEqual({
        message: 'coordinatePolygon deleted',
      });
    });
  });
});
