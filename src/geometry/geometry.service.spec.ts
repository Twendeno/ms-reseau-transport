import { Test, TestingModule } from '@nestjs/testing';
import { GeometryService } from './geometry.service';
import { PrismaService } from '../prisma/prisma.service';
import { geometryPrismaMock } from './mocks/geometry.prisma.mock';
import { geometryModelMock } from './mocks/geometry.model.mock';
import { NotFoundException } from '@nestjs/common';

describe('GeometryService', () => {
  let service: GeometryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GeometryService,
        { provide: PrismaService, useValue: geometryPrismaMock },
      ],
    }).compile();

    service = module.get<GeometryService>(GeometryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should find all geometries', () => {
      expect(service.findAll()).resolves.toEqual(
        geometryPrismaMock.geometry.findMany(),
      );
    });
  });

  describe('findOne', () => {
    it('should find one geometry', () => {
      jest
        .spyOn(geometryPrismaMock.geometry, 'findUnique')
        .mockResolvedValue(geometryModelMock[0]);
      expect(service.findOne('1')).resolves.toEqual(geometryModelMock[0]);
    });

    it('should throw an error if geometry not found', () => {
      jest
        .spyOn(geometryPrismaMock.geometry, 'findUnique')
        .mockResolvedValue(undefined);
      expect(() => service.findOne('1')).rejects.toBeInstanceOf(
        NotFoundException,
      );
      expect(() => service.findOne('1')).rejects.toEqual(
        new NotFoundException('Geometry not found'),
      );
    });
  });

  describe('update', () => {
    it('should update one geometry and return {message: "geometry update"}', () => {
      jest
        .spyOn(geometryPrismaMock.geometry, 'findUnique')
        .mockResolvedValue(geometryModelMock[0]);
      expect(
        service.update('1', { ...geometryModelMock[0], name: 'geo update' }),
      ).resolves.toEqual({ message: 'geometry update' });
    });

    it('should throw an error if geometry not found', () => {
      jest
        .spyOn(geometryPrismaMock.geometry, 'findUnique')
        .mockResolvedValue(undefined);
      expect(() =>
        service.update('1', geometryModelMock[0]),
      ).rejects.toBeInstanceOf(NotFoundException);
      expect(() => service.update('1', geometryModelMock[0])).rejects.toEqual(
        new NotFoundException('Geometry not found'),
      );
    });
  });

  describe('delete', () => {
    it('should delete one geometry and return {message: "geometry delete"}', () => {
      jest
        .spyOn(geometryPrismaMock.geometry, 'findUnique')
        .mockResolvedValue(geometryModelMock[0]);
      expect(service.delete('1')).resolves.toEqual({
        message: 'geometry delete',
      });
    });

    it('should throw an error if geometry not found', () => {
      jest
        .spyOn(geometryPrismaMock.geometry, 'findUnique')
        .mockResolvedValue(undefined);
      expect(() => service.delete('1')).rejects.toBeInstanceOf(
        NotFoundException,
      );
      expect(() => service.delete('1')).rejects.toEqual(
        new NotFoundException('Geometry not found'),
      );
    });
  });

  describe('create', () => {
    it('should create one geometry and return {message: "geometry create"}', () => {
      expect(service.create(geometryModelMock[0])).resolves.toEqual({
        message: 'geometry create',
      });
    });
  });
});
