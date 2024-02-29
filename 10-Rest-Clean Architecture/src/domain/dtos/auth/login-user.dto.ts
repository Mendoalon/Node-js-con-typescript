import { Validators } from '../../../config';

export class LoginUserDto {
  public email: string;
  public password: string;

  private constructor(email: string, password: string) {
    this.email = email;
    this.password = password;
  }

  static create(object: { email: string, password: string }): [string | undefined, LoginUserDto | undefined] {
    const { email, password } = object;

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

    return [undefined, new LoginUserDto(email, password)];
  }
}
