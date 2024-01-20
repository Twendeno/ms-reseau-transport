import { Test, TestingModule } from '@nestjs/testing';
import { CoordinateController } from './coordinate.controller';
import { CoordinateServiceMock } from './mocks/coordinate.service.mock';
import { CoordinateService } from './coordinate.service';
import { coordinateModelMock } from './mocks/coordinate.model.mock';

describe('CoordinateController', () => {
  let controller: CoordinateController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CoordinateController],
      providers: [
        { provide: CoordinateService, useClass: CoordinateServiceMock },
      ],
    }).compile();

    controller = module.get<CoordinateController>(CoordinateController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of coordinates', () => {
      expect(controller.findAll()).resolves.toEqual(coordinateModelMock);
    });
  });

  describe('findOne', () => {
    it('should return a coordinate', () => {
      const uuid = '1';
      const coordinate = coordinateModelMock.find(
        (coordinate) => coordinate.uuid === uuid,
      );
      expect(controller.findOne(uuid)).resolves.toEqual(coordinate);
    });
  });

  describe('create', () => {
    it('should return a {message: "Coordinate created"}', () => {
      expect(controller.create(coordinateModelMock[0])).resolves.toEqual({
        message: 'Coordinate created',
      });
    });
  });

  describe('update', () => {
    it('should return a {message: "Coordinate updated"}', () => {
      const uuid = '1';
      expect(controller.update(uuid, coordinateModelMock[0])).resolves.toEqual({
        message: 'Coordinate updated',
      });
    });
  });

  describe('delete', () => {
    it('should return a {message: "Coordinate deleted"}', () => {
      const uuid = '1';
      expect(controller.delete(uuid)).resolves.toEqual({
        message: 'Coordinate deleted',
      });
    });
  });
});
