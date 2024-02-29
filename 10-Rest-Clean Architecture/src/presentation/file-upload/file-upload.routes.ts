import { Router } from "express";

import { AuthMiddleware } from "../middlewares/auth.middleware";
import { FileUploadController } from "./file-upload.controller";
import { FileUploadService } from "../services/file-upload.service";
import { FileUploadMiddleware } from "../middlewares/file-upload.middleware";
import { TypeMiddleware } from "../middlewares/type.middlewares";

export class FileUploadRoutes {
  static get routes(): Router {
    const router = Router();

    //Instacia del fileUploadService y fileUploadController
    const fileUploadController = new FileUploadController(
      new FileUploadService()
    );

    router.use(
      AuthMiddleware.validateJWT,
      FileUploadMiddleware.containFiles,
      TypeMiddleware.validTypes(["users", "products", "categories"])
    );

    //Definicion de rutas Categories
    //rutas para recibir imagen o archivo de:  api/upload/ < user | category | product >
    // para subir uno o muchos archivos.
    router.post("/single/:type", fileUploadController.uploadFile);
    router.post("/multiple/:type", fileUploadController.uploadMultipleFiles);

    return router;
  }
}
