import { healthServiceMock } from "./healthCheck.model.mock";

export class HealthServiceMock {
  check = jest.fn().mockResolvedValue(healthServiceMock);
}