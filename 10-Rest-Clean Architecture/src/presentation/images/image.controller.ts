import { Request, Response } from "express";
import { ImageService } from "../services/image.service";


export class ImageController {
  constructor(
    private readonly imageService: ImageService,
) { }

  getImage = async (req: Request, res: Response) => {
    const { type = "", img = "" } = req.params;

    try {
      const imageData = await this.imageService.getImage(type, img);
      const contentType = 'image/jpeg'; 

      res.setHeader('Content-Type', contentType);
      res.send(imageData);
    } catch (error) {
      res.status(500).send("Error fetching image");
    }
  };
}
