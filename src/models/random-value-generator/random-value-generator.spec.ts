import { RandomValueGenerator } from './random-value-generator';

describe('RandomValueGenerator', () => {
  it('should be defined', () => {
    expect(new RandomValueGenerator()).toBeDefined();
  });
});

describe('RandomValueGenerator', () => {
  it('should be defined', () => {
    expect(RandomValueGenerator.generateRandomAlphaNumeric(10)).toBeDefined();
  });
});
