import express, { Express } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()
const app: Express = express()

app.use(express.json())

app.get('/users', async (req, res) => {
	const users = await prisma.user.findMany()
	res.json(users)
})

app.get('/user/:id', async (req, res) => {
	const { id } = req.params
	const users = await prisma.user.findUnique({
		where: { id: Number(id) },
	})
	res.json(users)
})

app.post(`/user`, async (req, res) => {
	const result = await prisma.user.create({
		data: { ...req.body },
	})
	res.json(result)
})

app.delete(`/user/:id`, async (req, res) => {
	const { id } = req.params
	const post = await prisma.user.delete({
		where: { id: Number(id) },
	})
	res.json(post)
})

app.listen(3000, () => {
	console.log(`⚡️[server]: Server is running at http://localhost:3000`);
});
