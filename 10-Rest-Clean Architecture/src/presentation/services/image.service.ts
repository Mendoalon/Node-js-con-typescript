import { PathAdapter } from "../../config";
import { FileSystemAdapter } from "../../config/file-system.adapter";

export class ImageService {
  private fileSystemAdapter: FileSystemAdapter;

  constructor() {
    this.fileSystemAdapter = new FileSystemAdapter();
  }
  getImage = async (type: string, img: string): Promise<Buffer> => {
    const filePath = PathAdapter.resolve(
      __dirname,
      `../../../uploads/${type}/${img}`
    );
    try {
      const imageData = await this.fileSystemAdapter.readFile(filePath); // Corregir aquí
      return imageData;
    } catch (error) {
      throw new Error("Error reading image file");
    }
  };
}
