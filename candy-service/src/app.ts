import express from "express";
import { Route } from "./interfaces/route.interface";
import { WebSocketServer } from 'ws';

class App {
	public express: express.Application;

	constructor(routes: Route[]) {
		this.express = express();
		this.init(routes);
	}

	private init(routes: Route[]) {
		this.initMiddleWares();
		this.initRoutes(routes);
	}

	private initMiddleWares() {
		this.express.use(express.json());
	}

	private initRoutes(routes: Route[]) {
		routes.forEach(route => {
			this.express.use("/", route.router);
		})
	}

	public startApp(port: number) {
		this.express.listen(port, "0.0.0.0", () => {
			console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
		});
	}

	public startWs(port: number) {
		const wss = new WebSocketServer({ port: port });
		wss.on("connection", function connection(ws) {
			ws.on("message", function message(data) {
				console.log('received: %s', data);
				ws.send("processing>>>> " + data);
			});
			wss.on("close", function () {
				console.log("closed");
			});
			ws.send('connected');
		});
	}

}

export default App;
