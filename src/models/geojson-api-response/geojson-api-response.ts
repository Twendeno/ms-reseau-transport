export class GeojsonApiResponse<T = any> {
  constructor(
    public readonly type: string,
    public readonly features: T,
  ) {}
}

export class Point {
  constructor(
    public readonly type: string,
    public readonly coordinates: [number, number],
  ) {}
}

export class MultiPoint {
  constructor(
    public readonly type: string,
    public readonly coordinates: number[][],
  ) {}
}

export class LineString {
  constructor(
    public readonly type: string,
    public readonly coordinates: number[][],
  ) {}
}

export class MultiLineString {
  constructor(
    public readonly type: string,
    public readonly coordinates: number[][][],
  ) {}
}

export class Polygon {
  constructor(
    public readonly type: string,
    public readonly coordinates: number[][][],
  ) {}
}

export class MultiPolygon {
  constructor(
    public readonly type: string,
    public readonly coordinates: number[][][][],
  ) {}
}

export class GeometryCollection {
  constructor(
    public readonly type: string,
    public readonly geometries: any[],
  ) {}
}

export class Feature {
  constructor(
    public readonly type: string,
    public readonly properties: any,
    public readonly geometry: any,
  ) {}
}

export class FeatureCollection<T = any> {
  constructor(
    public readonly type: string,
    public readonly features: any[],
  ) {}
}

export enum GeojsonType {
  Feature = 'Feature',
  FeatureCollection = 'FeatureCollection',
  Point = 'Point',
  MultiPoint = 'MultiPoint',
  LineString = 'LineString',
  MultiLineString = 'MultiLineString',
  Polygon = 'Polygon',
  MultiPolygon = 'MultiPolygon',
  GeometryCollection = 'GeometryCollection',
}
