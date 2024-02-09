import {
  Feature,
  GeojsonType,
  LineString,
  MultiLineString,
  MultiPoint,
  MultiPolygon,
  Point,
  Polygon,
} from '../geojson-api-response/geojson-api-response';

export class Transformer<T = any> {
  type: string;
  data: T;

  constructor(data: T, type: string) {
    this.type = type;
    this.data = data;
  }

  filterData():
    | Point
    | MultiPoint
    | LineString
    | MultiLineString
    | Polygon
    | MultiPolygon {
    let response: any = {};
    switch (this.type) {
      case GeojsonType.Point:
        response = new Point(this.type, [
          this.data[0].coordinate.longitude,
          this.data[0].coordinate.latitude,
        ]);
        break;
      case GeojsonType.MultiPoint:
        response = new MultiPoint(
          this.type,
          (this.data as any).map((data) => [
            data.coordinate.longitude,
            data.coordinate.latitude,
          ]),
        );
        break;
      case GeojsonType.LineString:
        response = new LineString(
          this.type,
          (this.data as any).map((data) => [
            data.coordinate.longitude,
            data.coordinate.latitude,
          ]),
        );
        break;
      case GeojsonType.MultiLineString:
        response = new MultiLineString(this.type, [
          (this.data as any).map((data) => [
            data.coordinate.longitude,
            data.coordinate.latitude,
          ]),
        ]);
        break;
      case GeojsonType.Polygon:
        response = new Polygon(this.type, [
          (this.data as any).map((data) => [
            data.coordinate.longitude,
            data.coordinate.latitude,
          ]),
        ]);
        break;
      case GeojsonType.MultiPolygon:
        response = new MultiPolygon(this.type, [
          [
            (this.data as any).map((data) => [
              data.coordinate.longitude,
              data.coordinate.latitude,
            ]),
          ],
        ]);
        break;
    }

    return response;
  }

  transform(isFeature: string ) {
    if (isFeature.trim().toLowerCase().toString() === 'feature') {
      return new Feature(GeojsonType.Feature, this.filterData(), {
        name: this.data[0].coordinate.name,
        address: this.data[0].coordinate.address,
      });
    }

    return this.filterData();
  }
}
