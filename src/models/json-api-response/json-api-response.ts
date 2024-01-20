export class JsonApiResponse<T = any> {
  constructor(
    public readonly statusCode: number,
    public readonly message: string,
    public readonly data: T,
  ) {}
}
