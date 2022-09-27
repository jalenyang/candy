import { Route } from "../interfaces/route.interface";
import { Router } from "express";
import SseController from "../controllers/sse.controller";

class SseRoute implements Route {
	path = "/sse";
	router = Router();
	private sseController = new SseController();

	constructor() {
		this.initRoute();
	}

	private initRoute() {
		this.router.get(this.path, this.sseController.sse)
	}
}

export default SseRoute;
