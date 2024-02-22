import { Router } from 'express';
import { AuthController } from './controller';
import { AuthService } from '../services/auth.service';
import { BcryptAdapter } from '../../config';




export class AuthRoutes {

  static get routes(): Router {

    //Instacias de clases.
    const router = Router();
    const bcryptAdapter = new BcryptAdapter();
    const authService = new AuthService(bcryptAdapter);
    const controller = new AuthController(authService);

    // Rutas...
    router.post('/login', controller.loginUser);
    router.post('/register', controller.registerUser);
    router.get('/validate-email/:token', controller.validateEmail);

    return router;
  }

}

