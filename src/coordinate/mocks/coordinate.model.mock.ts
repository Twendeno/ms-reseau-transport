import { CoordinateEntity } from '../models/coordinate.entity';
import { JsonApiResponse } from '../../models/json-api-response/json-api-response';
import { CoordinateDto } from '../dto/coordinate.dto';

export const coordinateModelMock: CoordinateEntity[] = [
  {
    uuid: '1',
    latitude: 1,
    longitude: 1,
    isStop: false,
    name: '1',
    latLng: '1,1',
    address: 'address1',
    isDeparture: false,
    isArrival: false,
  },
];
export const coordinateModelObjectMock: JsonApiResponse = {
  message: 'All coordinate founded',
  meta: undefined,
  statusCode: 200,
  data: coordinateModelMock,
};

export const coordinateModelMockOne: JsonApiResponse<CoordinateDto> = {
  data: coordinateModelMock[0],
  message: 'Coordinate founded',
  meta: undefined,
  statusCode: 200,
};

export const coordinateModelMockUpdate: JsonApiResponse<CoordinateDto> = {
  data: coordinateModelMock[0],
  message: 'Coordinate successfully updated',
  meta: undefined,
  statusCode: 200,
};

export const coordinateModelMockDelete: JsonApiResponse<CoordinateDto> = {
  data: coordinateModelMock[0],
  message: 'Coordinate successfully deleted',
  meta: undefined,
  statusCode: 200,
};

export const newCoordinateModelMock: CoordinateDto = {
  latitude: -2,
  longitude: 2,
  latLng: '-2,2',
  isStop: false,
  name: 'TestCoordinate',
  address: 'TestAddress',
  isDeparture: false,
  isArrival: false,
};

export const coordinateModelMockCreate: JsonApiResponse<CoordinateDto> = {
  data: newCoordinateModelMock,
  message: 'Coordinate successfully created',
  meta: undefined,
  statusCode: 201,
};
