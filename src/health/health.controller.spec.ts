import { Test, TestingModule } from '@nestjs/testing';
import { HealthController } from './health.controller';
import { HealthCheckService, HttpHealthIndicator } from "@nestjs/terminus";
import { HealthServiceMock } from "./mocks/healthService.mock";
import { healthServiceMock } from "./mocks/healthCheck.model.mock";
describe('HealthController', () => {
  let controller: HealthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HealthController],
      providers: [{ provide:HealthCheckService, useClass: HealthServiceMock }, { provide:HttpHealthIndicator, useValue: jest.fn() }],
    }).compile();

    controller = module.get<HealthController>(HealthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('check', () => {
    it('should return the result of the health check',  () => {
      expect(controller.check()).resolves.toEqual(healthServiceMock);
    });
  });

});
