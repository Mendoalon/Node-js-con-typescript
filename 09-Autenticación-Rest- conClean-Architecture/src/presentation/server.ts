import express, { Router, Express } from 'express';

interface Option {
    port?: number;
    routes: Router;
}

export class Server {

    private readonly app: Express;
    private readonly port: number;
    private readonly routes: Router;

    constructor(option: Option) {
        const { port = 3100, routes } = option;

        this.app = express();
        this.port = port;
        this.routes = routes;
    }

    async start() {

        //Middleware
        this.app.use(express.json());   // Aceptar y debolver archivos: json
        this.app.use(express.urlencoded({ extended: true })); // Aceptar y debolver archivos: x-www-form-urlencoded

        //Rutas definidas.
        this.app.use(this.routes);

        //Servidor escuchando
        this.app.listen(this.port, () => {
            console.log(`Server running on port ${this.port}`);
        });
    }

}