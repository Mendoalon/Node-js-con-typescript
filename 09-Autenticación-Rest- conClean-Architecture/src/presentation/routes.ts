import { Router } from "express";
import { AuthRoutes } from "./auth/authRoutes ";


export class AppRoutes {

    static get routes(): Router {

        const routes = Router();

        // Definir todas mis rutas principales.
        routes.use('/api/auth', AuthRoutes.routes );

        return routes;
    }


}