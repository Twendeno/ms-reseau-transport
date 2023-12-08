import { coordinateModelMock } from "./coordinate.model.mock";

export class CoordinateServiceMock {
  create = jest.fn().mockResolvedValue({ message: "Coordinate created" });
  findAll = jest.fn().mockResolvedValue(coordinateModelMock);
  findOne = jest.fn().mockImplementation((uuid: string) => {
    return Promise.resolve(coordinateModelMock.find(coordinate => coordinate.uuid === uuid));
  });
  update = jest.fn().mockResolvedValue({ message: "Coordinate updated" });
  delete = jest.fn().mockResolvedValue({ message: "Coordinate deleted" });
}