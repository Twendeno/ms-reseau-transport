import {
  Feature, FeatureCollection,
  GeojsonType,
  LineString,
  MultiLineString,
  MultiPoint,
  MultiPolygon,
  Point,
  Polygon
} from "../geojson-api-response/geojson-api-response";

export class Transformer<T = any> {
  type: string;
  data: T;

  constructor(data: T, type: string) {
    this.type = type;
    this.data = data;
  }

  transform():
    | Point
    | MultiPoint
    | LineString
    | MultiLineString
    | Polygon
    | MultiPolygon
    | Feature
    | FeatureCollection {
    switch (this.type) {
      case GeojsonType.Point:
        return new Point(this.type, [
          this.data[0].coordinate.latitude,
          this.data[0].coordinate.longitude,
        ]);
        break;
      case GeojsonType.MultiPoint:
        return new MultiPoint(
          this.type,
          (this.data as any).map((data) => [
            data.coordinate.latitude,
            data.coordinate.longitude,
          ]),
        );
        break;
      case GeojsonType.LineString:
        return new LineString(
          this.type,
          (this.data as any).map((data) => [
            data.coordinate.latitude,
            data.coordinate.longitude,
          ]),
        );
        break;
      case GeojsonType.MultiLineString:
        return new MultiLineString(this.type, [
          (this.data as any).map((data) => [
            data.coordinate.latitude,
            data.coordinate.longitude,
          ]),
        ]);
        break;
      case GeojsonType.Polygon:
        return new Polygon(this.type, [
          (this.data as any).map((data) => [
            data.coordinate.latitude,
            data.coordinate.longitude,
          ]),
        ]);
        break;
    }
  }
}
