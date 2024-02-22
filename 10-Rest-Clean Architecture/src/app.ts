import { envs } from './config/envs';
import { MongoDatabase } from './data';
import { AppRoutes } from './presentation/routes';
import { Server } from './presentation/server';


(async () => {
  try {
      // Inicialización de la base de datos
       await MongoDatabase.connect({
           dbName: envs.MONGO_DB_NAME,
           mongoUrl: envs.MONGO_URL,
       });

      // Inicio de nuestro servidor
      new Server({
          port: envs.PORT,
          routes: AppRoutes.routes
      }).start();
      
  } catch (error) {
      console.error("Error during app initialization:", error);
  }
})();
