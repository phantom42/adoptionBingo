import { setCors } from "../../../lib/cors.js";
import connectDB from "../../../db/connect.js";
import { getUserBoard } from "../../../lib/boards.js";
import { getAuthFromRequest } from "../../../lib/clerk.js";

export default async function handler (req, res) {
	if (setCors(req,res)) return ;
	const {userId} = await getAuthFromRequest(req);
	switch(req.method) {
		case 'GET':
			const reqUserId = req.query.userId || 0;
			if (userId && userId !== reqUserId) return res.status(400).json({message: 'user id does not match'});
			await connectDB();
			const userBoard = await getUserBoard(userId);
			if (!userBoard) return res.status(400).json({message: 'no user board found'});
			return res.status(200).json(userBoard);
		default: 
			return res.status(501).json({message: 'unauthorized'});
	}
}