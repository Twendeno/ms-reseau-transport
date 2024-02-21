export class CoordinatePolygonEntity {
  uuid: string;
  name: string;
  departure: string;
  arrival: string;
  isOnline: boolean = false;
  reference: string;
  geometry_uuid: string;
  coordinate_uuid: string;
  departure_coordinate_uuid: string;
  arrival_coordinate_uuid: string;
  assignedBy: string;
}
