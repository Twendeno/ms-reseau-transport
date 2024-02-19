import { Util } from '../../utils/util';
import { GeojsonType } from '../../models/geojson-api-response/geojson-api-response';

export class GeometryEntity {
  uuid: string;
  type: String = GeojsonType.LineString;
  name: string;
  reference: string;
  color: string = Util.generateNewColor();
  geodata: any;
  department_uuid: string;
  town_uuid: string;
  assignedBy: string;
  lastModifiedBy: string;
}
