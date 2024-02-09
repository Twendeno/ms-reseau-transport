import {
  Feature, FeatureCollection,
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
          this.data[0].coordinate.latitude,
          this.data[0].coordinate.longitude,
        ]);
        break;
      case GeojsonType.MultiPoint:
        response = new MultiPoint(
          this.type,
          (this.data as any).map((data) => [
            data.coordinate.latitude,
            data.coordinate.longitude,
          ]),
        );
        break;
      case GeojsonType.LineString:
        response = new LineString(
          this.type,
          (this.data as any).map((data) => [
            data.coordinate.latitude,
            data.coordinate.longitude,
          ]),
        );
        break;
      case GeojsonType.MultiLineString:
        response = new MultiLineString(this.type, [
          (this.data as any).map((data) => [
            data.coordinate.latitude,
            data.coordinate.longitude,
          ]),
        ]);
        break;
      case GeojsonType.Polygon:
        response = new Polygon(this.type, [
          (this.data as any).map((data) => [
            data.coordinate.latitude,
            data.coordinate.longitude,
          ]),
        ]);
        break;
      case GeojsonType.MultiPolygon:
        response = new MultiPolygon(this.type, [
          [
            (this.data as any).map((data) => [
              data.coordinate.latitude,
              data.coordinate.longitude,
            ]),
          ],
        ]);
        break;
    }

    return response;
  }

  transform(isFeature: boolean = true) {
    if (isFeature)
      return new Feature(GeojsonType.Feature, this.filterData(), {
        name: this.data[0].coordinate.name,
        address: this.data[0].coordinate.address,
      });
    return this.filterData();
  }
}
