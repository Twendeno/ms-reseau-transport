export class RandomValueGenerator {
  private static ALPHANUMERIC_CHARS: string =
    '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
  static generateRandomAlphaNumeric(generatorLength: number): string {
    let result: string = '';
    const charactersLength: number =
      RandomValueGenerator.ALPHANUMERIC_CHARS.length;

    for (let i: number = 0; i < generatorLength; i++) {
      const randomIndex: number = Math.floor(Math.random() * charactersLength);
      result += RandomValueGenerator.ALPHANUMERIC_CHARS.charAt(randomIndex);
    }

    return result;
  }
}
