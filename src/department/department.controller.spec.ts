import { Test, TestingModule } from '@nestjs/testing';
import { DepartmentController } from './department.controller';
import { DepartmentService } from './department.service';
import { DepartmentServiceMock } from './mocks/department.service.mock';
import { departmentModelMock } from './mocks/department.model.mock';

describe('DepartmentController', () => {
  let controller: DepartmentController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DepartmentController],
      providers: [
        { provide: DepartmentService, useClass: DepartmentServiceMock },
      ],
    }).compile();

    controller = module.get<DepartmentController>(DepartmentController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of departments', () => {
      expect(controller.findAll()).resolves.toEqual(departmentModelMock);
    });
  });

  describe('findOne', () => {
    it('should return a department', () => {
      expect(controller.findOne('1')).resolves.toEqual(departmentModelMock[0]);
    });
  });

  describe('create', () => {
    it('should return a department', () => {
      expect(controller.create(departmentModelMock[0])).resolves.toEqual({
        message: 'department created',
      });
    });
  });

  describe('update', () => {
    it('should return a department', () => {
      expect(controller.update('1', departmentModelMock[0])).resolves.toEqual({
        message: 'department updated',
      });
    });
  });

  describe('delete', () => {
    it('should return a department', () => {
      expect(controller.delete('1')).resolves.toEqual({
        message: 'department deleted',
      });
    });
  });
});
