import UserService from "../services/user.service";
import { Request, Response } from 'express';

class UserController {
	private userService = new UserService();

	public getUsers = async (req: Request, res: Response) => {
		const users = await this.userService.getUsers();
		res.json(users);
	};

	public getUserById = async (req: Request, res: Response) => {
		const { id } = req.params
		const user = this.userService.getUserByID(Number(id));
		res.json(user);
	}

	public addUser = async (req: Request, res: Response) => {
		const result = this.userService.addUser(req.body);
		res.json(result);
	}

	public deleteUser = async (req: Request, res: Response) => {
		const { id } = req.params
		const result = this.userService.deleteUser(Number(id));
		res.json(result);
	}

}

export default UserController
