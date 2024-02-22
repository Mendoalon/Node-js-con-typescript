import { Router } from "express";
import { AuthController } from "./authController";
import { AuthDatasourceImpl, AuthRepositoryImpl } from "../../infrastructure";
import { AuthMiddleware } from "../middlewares/auth.middlewar";

export class AuthRoutes {

    static get routes(): Router {

        const routes = Router();

        //Creando instacias para envia.
        const datasource = new AuthDatasourceImpl();
        const AuthRepository = new AuthRepositoryImpl(datasource);

        const authController = new AuthController(AuthRepository);


        // Definir todas mis rutas principales.
        routes.post('/login', authController.loginUser);
        routes.post('/register', authController.registerUser);
        routes.get('/', [AuthMiddleware.validateJWT], authController.getUsers);



        return routes;
    }


}