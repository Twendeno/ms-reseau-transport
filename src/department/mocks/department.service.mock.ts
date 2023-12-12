import { departmentModelMock } from "./department.model.mock";

export class DepartmentServiceMock {
  findAll= jest.fn().mockResolvedValue(departmentModelMock);
  create = jest.fn().mockResolvedValue({ message: "department created" });
  findOne = jest.fn().mockImplementation((uuid: string) => {
    return Promise.resolve(departmentModelMock.find(department => department.uuid === uuid));
  });
  update = jest.fn().mockResolvedValue({ message: "department updated" });
  delete = jest.fn().mockResolvedValue({ message: "department deleted" });
}