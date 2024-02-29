import { Router } from "express";
import { CategoyController } from "./category.controller";
import { AuthMiddleware } from "../middlewares/auth.middleware";
import { CategoryService } from "../services/category.service";

export class CategoryRoutes {
  static get routes(): Router {
    const router = Router();

    //Instacia del CategoryService y CategoyController
    const categoryService = new CategoryService();
    const categoyController = new CategoyController(categoryService);

    //Definicion de rutas Categories
    router.get(
      "/",
      [AuthMiddleware.validateJWT],
      categoyController.getCategories
    );
    router.post(
      "/",
      [AuthMiddleware.validateJWT],
      categoyController.createCategory
    );

    return router;
  }
}
