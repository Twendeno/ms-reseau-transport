import { geometryModelMock } from './geometry.model.mock';

export const geometryPrismaMock = {
  geometry: {
    findMany: jest.fn().mockResolvedValue(geometryModelMock),
    findUnique: jest.fn(),
    create: jest.fn().mockResolvedValue({ message: 'geometry created' }),
    update: jest.fn(),
    delete: jest.fn(),
  },
};
