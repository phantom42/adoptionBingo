import connectDB from "../../db/connect.js";
import {generateBoard, saveBoard} from '../../lib/boards.js'
import { getAuthFromRequest } from "../../lib/clerk.js";

export default async function handler(req, res){

	const {userId} = await getAuthFromRequest(req);
	switch(req.method) {
		case 'GET':
			const reqUserId = req.query.userId || 0;
			if (userId && userId !== reqUserId) return res.status(401).json({message: 'user id does not match'});
			await connectDB();
			const userBoard = await generateBoard(reqUserId, reqUserId !== 0 ? true : false);
			return res.status(200).json(userBoard);
		case 'POST':
			if (userId === 0) {
				return res.status(401).json({message: 'unauthorized', debug: 1});
			}
			if (req.body.user !== userId){
				//return res.status(401).json({message: 'unauthorized', debug: 2});
			}
			await connectDB();
			const result = await saveBoard(req.body);
			return res.status(200).json({message: result.message});
		default: 
			return res.status(501).json({message: 'unauthorized', debug: 3});

	}
}