export class Util {
  public static getMetadata(total: number, page: number, perPage: number) {
    const lastPage = Math.ceil(total / perPage);
    return {
      total,
      lastPage,
      currentPage: page,
      perPage,
      prev: page > 1 ? page - 1 : null,
      next: page < lastPage ? page + 1 : null,
    };
  }

  private static hexCharacters = [
    0,
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9,
    'A',
    'B',
    'C',
    'D',
    'E',
    'F',
  ];

  private static getCharacter(index: number) {
    return this.hexCharacters[index];
  }

  public static generateNewColor() {
    let hexColorRep = '#';

    for (let index = 0; index < 6; index++) {
      const randomPosition = Math.floor(
        Math.random() * this.hexCharacters.length,
      );
      hexColorRep += this.getCharacter(randomPosition);
    }

    return hexColorRep;
  }
}
