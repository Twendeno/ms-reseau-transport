export class DepartmentEntity {
  uuid: string;
  name: string;
  area: number = 0;
  assignedBy: string;
  lastModifiedBy: string;
  geodata: any;
}
