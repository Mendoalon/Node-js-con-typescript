import fs from "fs";

export class FileSystemAdapter {
  readFile = (filePath: string): Promise<Buffer> => {
    return new Promise((resolve, reject) => {
      fs.readFile(filePath, (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    });
  };

  fileExists = (filePath: string): boolean => {
    return fs.existsSync(filePath);
  };
}
