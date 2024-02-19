import { Test, TestingModule } from '@nestjs/testing';
import { CoordinateService } from './coordinate.service';
import { PrismaService } from '../prisma/prisma.service';
import { coordinatePrismaMock } from './mocks/coordinate.prisma.mock';
import {
  coordinateModelMock,
  coordinateModelMockCreate,
  coordinateModelMockDelete,
  coordinateModelMockUpdate,
  newCoordinateModelMock,
} from './mocks/coordinate.model.mock';
import { NotFoundException } from '@nestjs/common';
import { CoordinateDto } from './dto/coordinate.dto';

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
    it('should find all coordinates without paginate', async () => {
      await expect(service.findAll()).resolves.toMatchObject(
        coordinatePrismaMock.coordinate.findMany(),
      );
    });
  });

  describe('findOne', () => {
    it('should find one coordinate', async () => {
      await expect(service.findOne('1')).resolves.toMatchObject(
        coordinatePrismaMock.coordinate.findUnique(),
      );
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
    it('should update one coordinate and return {message: "coordinate update"}', async () => {
      const coordinate = coordinateModelMock[0];

      jest
        .spyOn(coordinatePrismaMock.coordinate, 'findUnique')
        .mockResolvedValue(coordinate);

      jest
        .spyOn(coordinatePrismaMock.coordinate, 'update')
        .mockResolvedValue(coordinate); // Assurez-vous de configurer correctement votre mock

      const result = await service.update('1', coordinate);

      expect(result).toMatchObject(coordinateModelMockUpdate); // Utilisez directement la valeur retournée par la méthode update
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
    it('should delete one coordinate and return {message: "coordinate delete"}', async () => {
      const coordinate = coordinateModelMock[0];

      jest
        .spyOn(coordinatePrismaMock.coordinate, 'findUnique')
        .mockResolvedValue(coordinate);

      jest
        .spyOn(coordinatePrismaMock.coordinate, 'delete')
        .mockResolvedValue(coordinate); // Assurez-vous de configurer correctement votre mock

      const result = await service.delete('1');

      expect(result).toMatchObject(coordinateModelMockDelete);
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
    it('should create one coordinate and return {message: "coordinate created"}', async () => {
      // jest
      //   .spyOn(coordinatePrismaMock.coordinate, 'findUnique')
      //   .mockResolvedValue(newCoordinateModelMock);

      // jest
      //   .spyOn(coordinatePrismaMock.coordinate, 'create')
      //   .mockResolvedValue(coordinate);

      jest
        .spyOn(coordinatePrismaMock.coordinate, 'create')
        .mockResolvedValue(newCoordinateModelMock);

      expect(await service.create(newCoordinateModelMock)).toBe(
        newCoordinateModelMock,
      );
    });
  });
});
