export class CreateCategoryDto {
  public readonly name: string;
  public readonly available: boolean;

  private constructor(name: string, available: boolean) {
    this.name = name;
    this.available = available;
  }

  static create(object: { name: string; available: boolean | string }): [string | undefined, CreateCategoryDto | undefined] {
    const { name, available } = object;

    if (!name) return ['Missing name', undefined];

    let availableBoolean: boolean;

    if (typeof available === 'boolean') {
      availableBoolean = available;
    } else {
      availableBoolean = available === 'true';
    }

    return [undefined, new CreateCategoryDto(name, availableBoolean)];
  }
}
