import { Test, TestingModule } from '@nestjs/testing';
import { GeometryController } from './geometry.controller';
import { GeometryService } from './geometry.service';
import { GeometryServiceMock } from './mocks/geometry.service.mock';
import { geometryModelMock } from './mocks/geometry.model.mock';

describe('GeometryController', () => {
  let controller: GeometryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GeometryController],
      providers: [{ provide: GeometryService, useClass: GeometryServiceMock }],
    }).compile();

    controller = module.get<GeometryController>(GeometryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of geometries', () => {
      expect(controller.findAll()).resolves.toEqual(geometryModelMock);
    });
  });

  describe('findOne', () => {
    it('should return a geometry', () => {
      const uuid = '1';
      const geometry = geometryModelMock.find(
        (geometry) => geometry.uuid === uuid,
      );
      expect(controller.findOne(uuid)).resolves.toEqual(geometry);
    });
  });

  describe('create', () => {
    it('should return a geometry', () => {
      expect(controller.create(geometryModelMock[0])).resolves.toEqual({
        message: 'Geometry created',
      });
    });
  });

  describe('update', () => {
    it('should return a geometry', () => {
      expect(controller.update('1', geometryModelMock[0])).resolves.toEqual({
        message: 'Geometry updated',
      });
    });
  });

  describe('delete', () => {
    it('should return a geometry', () => {
      expect(controller.delete('1')).resolves.toEqual({
        message: 'Geometry deleted',
      });
    });
  });

  describe('findByReference', () => {
    it('should return a geometry', () => {
      const ref = 'abc';
      const geometry = geometryModelMock.find(
        (geometry) => geometry.reference === ref,
      );
      expect(controller.findByReference(ref)).resolves.toEqual(geometry);
    });
  });
});
