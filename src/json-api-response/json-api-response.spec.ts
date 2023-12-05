import { JsonApiResponse } from './json-api-response';

describe('JsonApiResponse', () => {
  it('should be defined', () => {
    expect(new JsonApiResponse(200,"","")).toBeDefined();
  });
});
