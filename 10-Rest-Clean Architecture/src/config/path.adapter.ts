import * as path from "path";

export class PathAdapter {
  static resolve(...paths: string[]): string {
    return path.resolve(...paths);
  }

  static join(...paths: string[]): string {
    return path.join(...paths);
  }
}
