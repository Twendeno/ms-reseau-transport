import { coordinateModelMock } from "./coordinate.model.mock";

export const coordinatePrismaMock = {
  coordinate: {
    findMany: jest.fn().mockResolvedValue(coordinateModelMock),
    findUnique: jest.fn(),
    create: jest.fn().mockResolvedValue({message: "coordinate created"}),
    update: jest.fn(),
    delete: jest.fn(),
  }
}