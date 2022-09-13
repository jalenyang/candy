import express from "express";
import { hostname } from "os";
import { Route } from "./interfaces/route.interface";

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

}

export default App;
