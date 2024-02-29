import { Validators } from '../../../config';

export class RegisterUserDto {
  public name: string;
  public email: string;
  public password: string;

  private constructor(name: string, email: string, password: string) {
    this.name = name;
    this.email = email;
    this.password = password;
  }

  static create(object: { name: string, email: string, password: string }): [string | undefined, RegisterUserDto | undefined] {
    const { name, email, password } = object;

    if (!name) {
      return ['Missing name', undefined];
    }

    if (!email) {
      return ['Missing email', undefined];
    }

    if (!Validators.email.test(email)) {
      return ['Email is not valid', undefined];
    }

    if (!password) {
      return ['Missing password', undefined];
    }

    if (password.length < 6) {
      return ['Password too short', undefined];
    }

    return [undefined, new RegisterUserDto(name, email, password)];
  }
}
