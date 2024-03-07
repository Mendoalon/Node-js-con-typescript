import { Server } from "http";
import { WebSocketServer, WebSocket } from "ws";

interface Options {
    server: Server;
    path?: string; // ws
}

export class WssService {
    private static _instace: WssService;
    private wss: WebSocketServer;

    private constructor(options: Options) {
        const { server, path } = options; //Localhost:3000/ws

        this.wss = new WebSocketServer({ server, path });
    }


    static get instance(): WssService {
        if (!WssService._instace) {
            throw "WssService is not initialized";
        }
        return WssService._instace;
    }

    static initWss(options: Options): void {
        WssService._instace = new WssService(options);
    }


    public sendMessage(type: string, payload: Object) {

        this.wss.clients.forEach(client => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(JSON.stringify({ type, payload }));
            }
        })
    }

    public start(): void {
        this.wss.on("connection", (ws: WebSocket) => {
            console.log("Cliente Connection");

            ws.on("close", () => console.log("Cliente Desconnection"));
        });
    }
}