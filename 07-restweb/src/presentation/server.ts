import express, { Router } from 'express';
import compression from 'compression';
import path from 'path';

interface Options {
    port: number;
    routes: Router;
    public_path?: string;

}

export class Server {
    private app = express();
    private readonly port: number;
    private readonly routes: Router;
    private readonly publicPath: string;

    constructor(options: Options) {
        const { port, routes, public_path = 'public' } = options;
        this.port = port;
        this.publicPath = public_path;
        this.routes = routes;
    }

    async start() {

        //* Middleware
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));
        this.app.use(compression());

        //* Public Folder
        this.app.use(express.static(this.publicPath));

        //* Router
        this.app.use(this.routes);


        //* SPA
        this.app.get('*', (req, res) => {
            const indexPaht = path.join(__dirname, `../../${this.publicPath}/index.html`)
            res.sendFile(indexPaht);
        });

        this.app.listen(this.port, () => {
            console.log(`Server started on port ${this.port}`);
        })

    }

}
