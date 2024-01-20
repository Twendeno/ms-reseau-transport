import { coordinatePolygonModelMock } from './coordinate-polygon.model.mock';

export class CoordinatePolygonServiceMock {
  create = jest.fn().mockResolvedValue({ message: 'coordinate created' });
  findAll = jest.fn().mockResolvedValue(coordinatePolygonModelMock);
  findOne = jest.fn().mockResolvedValue((uuid: string) => {
    return Promise.resolve(
      coordinatePolygonModelMock.find(
        (coordinatePolygon) => coordinatePolygon.uuid === uuid,
      ),
    );
  });
  update = jest.fn().mockResolvedValue({ message: 'coordinate updated' });
  delete = jest.fn().mockResolvedValue({ message: 'coordinate deleted' });
  findManyByGeometryUuid = jest.fn();
}
