import connectDB from "../../db/connect.js";
import { getAllSquares } from "../../lib/squares.js";
export default async function handler(req, res){
	switch(req.method) {
		case 'GET': 
			await connectDB();
			const allSquares = await getAllSquares();
			return res.status(200).json(allSquares);
		case 'OPTIONS':
			return res.status(204).json({message: 'OPTIONS'});
		default: 
			return res.status(401).json({message: 'unauthorized'});
	}
}