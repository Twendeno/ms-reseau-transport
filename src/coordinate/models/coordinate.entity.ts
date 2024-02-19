export class CoordinateEntity {
  uuid: string;
  latitude: number;
  longitude: number;
  isStop: boolean = false;
  latLng: string;
  name: string;
  address: string;
}
