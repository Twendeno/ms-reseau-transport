import { Test, TestingModule } from '@nestjs/testing';
import { CoordinateController } from './coordinate.controller';
import { CoordinateServiceMock } from './mocks/coordinate.service.mock';
import { CoordinateService } from './coordinate.service';
import { coordinateModelMock } from './mocks/coordinate.model.mock';
import { Request } from 'express';
import { CACHE_MANAGER } from '@nestjs/cache-manager';

describe('CoordinateController', () => {
  let controller: CoordinateController;
  const page = 1;
  const perPage = 10;
  const req: Request = { query: {} } as Request;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CoordinateController],
      providers: [
        { provide: CoordinateService, useClass: CoordinateServiceMock },
        { provide: CACHE_MANAGER, useValue: {} },
      ],
    }).compile();

    controller = module.get<CoordinateController>(CoordinateController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of coordinates with paginate', () => {
      expect(controller.findAll(page, perPage, req)).resolves.toEqual(
        coordinateModelMock,
      );
    });

    it('should return an array of coordinates without paginate', () => {
      expect(controller.findAll(undefined, undefined, req)).resolves.toEqual(
        coordinateModelMock,
      );
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
