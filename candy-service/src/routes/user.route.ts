import { Router } from "express";
import UserController from "../controllers/user.controller";
import { Route } from "../interfaces/route.interface";

class UserRoute implements Route {
	public path = "/users";
	public router = Router();
	private userController = new UserController();

	constructor() {
		this.initRoutes();
	}

	private initRoutes() {
		this.router.get(`${this.path}`, this.userController.getUsers);
		this.router.get(`${this.path}/:id`, this.userController.getUserById);
		this.router.post(`${this.path}`, this.userController.addUser);
		this.router.delete(`${this.path}/:id`, this.userController.deleteUser);
	}

}

export default UserRoute;
