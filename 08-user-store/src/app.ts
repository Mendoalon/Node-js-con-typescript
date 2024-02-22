import { envs } from './config/envs';
import { MongoDatabase } from './data';
import { AppRoutes } from './presentation/routes';
import { Server } from './presentation/server';

class App {
  private server: Server;

  constructor() {
    this.server = new Server({
      port: envs.PORT,
      routes: AppRoutes.routes,
    });
  }

  async start() {
    await this.connectToDatabase();
    this.server.start();
  }

  private async connectToDatabase() {
    await MongoDatabase.connect({
      dbName: envs.MONGO_DB_NAME,
      mongoUrl: envs.MONGO_URL,
    });
  }
}

(async () => {
  const app = new App();
  await app.start();
})();
