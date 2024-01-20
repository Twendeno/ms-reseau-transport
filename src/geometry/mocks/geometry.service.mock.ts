import { geometryModelMock } from './geometry.model.mock';

export class GeometryServiceMock {
  findAll = jest.fn().mockResolvedValue(geometryModelMock);
  create = jest.fn().mockResolvedValue({ message: 'Geometry created' });
  findOne = jest.fn().mockImplementation((uuid: string) => {
    return Promise.resolve(
      geometryModelMock.find((geometry) => geometry.uuid === uuid),
    );
  });
  update = jest.fn().mockResolvedValue({ message: 'Geometry updated' });
  delete = jest.fn().mockResolvedValue({ message: 'Geometry deleted' });
  findGeometryByReference = jest.fn().mockImplementation((ref: string) => {
    return Promise.resolve(
      geometryModelMock.find((geometry) => geometry.reference === ref),
    );
  });
}
