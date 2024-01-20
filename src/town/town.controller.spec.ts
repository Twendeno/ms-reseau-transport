import { Test, TestingModule } from '@nestjs/testing';
import { TownController } from './town.controller';
import { TownService } from './town.service';
import { townModelMock } from './mocks/town.model.mock';
import { TownServiceMock } from './mocks/town.service.mock';

describe('TownController', () => {
  let controller: TownController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TownController],
      providers: [{ provide: TownService, useClass: TownServiceMock }],
    }).compile();

    controller = module.get<TownController>(TownController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of towns', () => {
      expect(controller.findAll()).resolves.toEqual(townModelMock);
    });
  });

  describe('findOne', () => {
    it('should return a town', () => {
      expect(controller.findOne('1')).resolves.toEqual(townModelMock[0]);
    });
  });

  describe('create', () => {
    it('should create a town', () => {
      expect(controller.create(townModelMock[0])).resolves.toEqual({
        message: 'town created',
      });
    });
  });

  describe('update', () => {
    it('should update a town', () => {
      expect(controller.update('1', townModelMock[0])).resolves.toEqual({
        message: 'town updated',
      });
    });
  });

  describe('delete', () => {
    it('should delete a town', () => {
      expect(controller.delete('1')).resolves.toEqual({
        message: 'town deleted',
      });
    });
  });
});
