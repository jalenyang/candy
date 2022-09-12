import { PrismaClient} from "@prisma/client";

class UserService {
	private prisma = new PrismaClient()

	public getUsers = async () => {
		const users = await this.prisma.user.findMany();
		return users;
	}

	public getUserByID = async (id: number) => {
		const users = await this.prisma.user.findUnique({
			where: { id: id },
		});
		return users;
	}


	public addUser = async (user: any) => {
		const result = await this.prisma.user.create({
			data: user,
		})
		return result;
	}

	public deleteUser = async (id: number) => {
		const post = await this.prisma.user.delete({
			where: { id: id },
		})
		return post;
	}

}

export default UserService;
