import {
  coordinateModelMockCreate,
  coordinateModelMockDelete,
  coordinateModelMockOne,
  coordinateModelMockUpdate,
  coordinateModelObjectMock,
  newCoordinateModelMock,
} from './coordinate.model.mock';

export const coordinatePrismaMock = {
  coordinate: {
    findMany: jest.fn().mockResolvedValue(coordinateModelObjectMock),
    findUnique: jest.fn().mockResolvedValue(coordinateModelMockOne),
    create: jest.fn(),
    update: jest.fn().mockResolvedValue(coordinateModelMockUpdate),
    delete: jest.fn().mockResolvedValue(coordinateModelMockDelete),
  },
};
