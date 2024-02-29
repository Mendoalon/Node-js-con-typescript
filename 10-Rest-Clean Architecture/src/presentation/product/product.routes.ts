import { Router } from 'express';
import { AuthMiddleware } from '../middlewares/auth.middleware';
import { ProductController } from './product.controller';
import { ProductService } from '../services/product.service';



export class ProductRoutes {

    static get routes(): Router {

        const router = Router();

        //Instacia del CategoryService y CategoyController
         const productService = new ProductService();
        const productController = new ProductController(productService);


        //Definicion de rutas Categories
        router.get('/', [AuthMiddleware.validateJWT], productController.getProduct);
        router.post('/', [AuthMiddleware.validateJWT], productController.createProduct);

        return router;
    }

}

