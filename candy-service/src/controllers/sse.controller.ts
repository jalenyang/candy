import { Request, Response } from "express";

class SseController {

	public sse = async (req: Request, res: Response) => {
		res.set({
			'Cache-Control': 'no-cache',
			'Content-Type': 'text/event-stream',
			'Connection': 'keep-alive'
		});
		res.flushHeaders();

		res.write('retry: 10000\n\n');
		setInterval(() => {
			const date = (new Date()).toLocaleTimeString();
			res.write(`data: date: ${date}\n\n`);
		}, 1000);
	};
}

export default SseController
