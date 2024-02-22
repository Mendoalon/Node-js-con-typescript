export interface PasswordHasher {
  hashPassword(password: string): string;
  comparePassword(password: string, hashed: string): boolean;
}


import { compareSync, genSaltSync, hashSync } from 'bcryptjs';

export class BcryptAdapter implements PasswordHasher {

  hashPassword(password: string): string {
    const salt = genSaltSync();
    return hashSync(password, salt);
  }

  comparePassword(password: string, hashed: string): boolean {
    return compareSync(password, hashed);
  }

}