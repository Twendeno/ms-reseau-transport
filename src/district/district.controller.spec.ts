import { Test, TestingModule } from '@nestjs/testing';
import { DistrictController } from './district.controller';
import { DistrictService } from "./district.service";
import { DistrictServiceMock } from "./mocks/district.service.mock";
import { districtModelMock } from "./mocks/district.model.mock";

describe('DistrictController', () => {
  let controller: DistrictController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DistrictController],
      providers: [{ provide: DistrictService, useClass: DistrictServiceMock }],
    }).compile();

    controller = module.get<DistrictController>(DistrictController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of district',  () => {
      expect(controller.findAll()).resolves.toEqual(districtModelMock);
    });
  });

  describe('findOne', () => {
    it('should return a district',  () => {
      expect(controller.findOne("1")).resolves.toEqual(districtModelMock[0]);
    });
  });

  describe('create', () => {
    it('should return a district',  () => {
      expect(controller.create(districtModelMock[0])).resolves.toEqual({message: "district created"});
    });
  });

  describe('update', () => {
    it('should return a district',  () => {
      expect(controller.update("1", districtModelMock[0])).resolves.toEqual({message: "district updated"});
    });
  });

  describe('delete', () => {
    it('should return a district',  () => {
      expect(controller.delete("1")).resolves.toEqual({message: "district deleted"});
    });
  });
});
