import { GeojsonApiResponse } from './geojson-api-response';

describe('GeojsonApiResponse', () => {
  it('should be defined', () => {
    expect(new GeojsonApiResponse('', '')).toBeDefined();
  });
});
