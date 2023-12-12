import { townModelMock } from "./town.model.mock";

export class TownServiceMock {
  findAll= jest.fn().mockResolvedValue(townModelMock);
  create = jest.fn().mockResolvedValue({ message: "town created" });
  findOne = jest.fn().mockImplementation((uuid: string) => {
    return Promise.resolve(townModelMock.find(town => town.uuid === uuid));
  });
  update = jest.fn().mockResolvedValue({ message: "town updated" });
  delete = jest.fn().mockResolvedValue({ message: "town deleted" });
}