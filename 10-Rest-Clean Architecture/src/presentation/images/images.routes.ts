import { Router } from "express";
import { ImageController } from "./image.controller";
import { ImageService } from "../services/image.service";

export class ImageRoutes {
  static get routes(): Router {
    const router = Router();

    //Instacia del fileUploadService y fileUploadController
    const imageService = new ImageService();
    const imageController = new ImageController(imageService);

    //rutas para enviar imagen o archivo de:  api/images/ < user | category | product >
    router.get("/:type/:img", imageController.getImage);

    return router;
  }
}
