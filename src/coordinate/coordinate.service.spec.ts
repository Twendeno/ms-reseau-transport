import { Test, TestingModule } from '@nestjs/testing';
import { CoordinateService } from './coordinate.service';
import { PrismaService } from '../prisma/prisma.service';
import { coordinatePrismaMock } from './mocks/coordinate.prisma.mock';
import { coordinateModelMock } from './mocks/coordinate.model.mock';
import { NotFoundException } from '@nestjs/common';

describe('CoordinateService', () => {
  let service: CoordinateService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CoordinateService,
        { provide: PrismaService, useValue: coordinatePrismaMock },
      ],
    }).compile();

    service = module.get<CoordinateService>(CoordinateService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should find all coordinates', () => {
      expect(service.findAll()).resolves.toEqual(
        coordinatePrismaMock.coordinate.findMany(),
      );
    });
  });

  describe('findOne', () => {
    it('should find one coordinate', () => {
      jest
        .spyOn(coordinatePrismaMock.coordinate, 'findUnique')
        .mockResolvedValue(coordinateModelMock[0]);
      expect(service.findOne('1')).resolves.toEqual(coordinateModelMock[0]);
    });

    it('should throw an error if coordinate not found', () => {
      jest
        .spyOn(coordinatePrismaMock.coordinate, 'findUnique')
        .mockResolvedValue(undefined);
      expect(() => service.findOne('1')).rejects.toBeInstanceOf(
        NotFoundException,
      );
      expect(() => service.findOne('1')).rejects.toEqual(
        new NotFoundException('Coordinate not found'),
      );
    });
  });

  describe('update', () => {
    it('should update one coordinate and return {message: "coordinate update"}', () => {
      jest
        .spyOn(coordinatePrismaMock.coordinate, 'findUnique')
        .mockResolvedValue(coordinateModelMock[0]);
      expect(
        service.update('1', { ...coordinateModelMock[0], isStop: true }),
      ).resolves.toEqual({ message: 'coordinate update' });
    });

    it('should throw an error if coordinate not found', () => {
      jest
        .spyOn(coordinatePrismaMock.coordinate, 'findUnique')
        .mockResolvedValue(undefined);
      expect(() =>
        service.update('1', coordinateModelMock[0]),
      ).rejects.toBeInstanceOf(NotFoundException);
      expect(() => service.update('1', coordinateModelMock[0])).rejects.toEqual(
        new NotFoundException('Coordinate not found'),
      );
    });
  });

  describe('delete', () => {
    it('should delete one coordinate and return {message: "coordinate delete"}', () => {
      jest
        .spyOn(coordinatePrismaMock.coordinate, 'findUnique')
        .mockResolvedValue(coordinateModelMock[0]);
      expect(service.delete('1')).resolves.toEqual({
        message: 'coordinate delete',
      });
    });

    it('should throw an error if coordinate not found', () => {
      jest
        .spyOn(coordinatePrismaMock.coordinate, 'findUnique')
        .mockResolvedValue(undefined);
      expect(() => service.delete('1')).rejects.toBeInstanceOf(
        NotFoundException,
      );
      expect(() => service.delete('1')).rejects.toEqual(
        new NotFoundException('Coordinate not found'),
      );
    });
  });

  describe('create', () => {
    it('should create one coordinate and return {message: "coordinate created"}', () => {
      expect(service.create(coordinateModelMock[0])).resolves.toEqual({
        message: 'coordinate created',
      });
    });
  });
});
