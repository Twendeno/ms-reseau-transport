import { districtModelMock } from "./district.model.mock";

export class DistrictServiceMock {
  findAll= jest.fn().mockResolvedValue(districtModelMock);
  create = jest.fn().mockResolvedValue({ message: "district created" });
  findOne = jest.fn().mockImplementation((uuid: string) => {
    return Promise.resolve(districtModelMock.find(district => district.uuid === uuid));
  });
  update = jest.fn().mockResolvedValue({ message: "district updated" });
  delete = jest.fn().mockResolvedValue({ message: "district deleted" });
}