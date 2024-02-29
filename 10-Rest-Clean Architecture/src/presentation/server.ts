import express, { Router } from "express";
import fileupload from "express-fileupload";
import { PathAdapter } from "../config";

interface Options {
  port: number;
  routes: Router;
  public_path?: string;
}

export class Server {
  public readonly app = express();
  private serverListener?: any;
  private readonly port: number;
  private readonly publicPath: string;
  private readonly routes: Router;

  constructor(options: Options) {
    const { port, routes, public_path = "public" } = options;
    this.port = port;
    this.publicPath = public_path;
    this.routes = routes;
  }
 
  async start() {
    //* Middlewares
    this.app.use(express.json()); // Aceptar y debolver archivos: json
    this.app.use(express.urlencoded({ extended: true })); // Aceptar y debolver archivos: x-www-form-urlencoded
    this.app.use(
      fileupload({  // Aceptar archivos
        limits: { fileSize: 50 * 1024 * 1024 },
      })
    );

    //* Public Folder
    this.app.use(express.static(this.publicPath));

    //* Rutas definidas.
    this.app.use(this.routes);

    //* SPA /^\/(?!api).*/  <== Únicamente si no empieza con la palabra api
    this.app.get("*", (req, res) => {
      const indexPath = PathAdapter.join(
        __dirname + `../../../${this.publicPath}/index.html`
      );
      res.sendFile(indexPath);
    });

    //Servidor escuchando
    this.serverListener = this.app.listen(this.port, () => {
      console.log(`Server running on port ${this.port}`);
    });
  }

  public close() {
    this.serverListener?.close();
  }
}
