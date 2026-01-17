import connectDB from "../../db/connect.js";
import {generateBoard} from '../../lib/boards.js'

export default async function handler(req, res){

	switch(req.method) {
		case 'GET':
			await connectDB();
			const userBoard = await generateBoard();
			return res.status(200).json(userBoard);
		case 'POST':
			break;

	}
	
	return res.status(200).json({'ok': true});
}