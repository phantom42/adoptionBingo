import { setCors } from "../../lib/cors.js";
import connectDB from "../../db/connect.js";
import Square from '../../models/Square.js'
export default async function handler(req, res){
	if (setCors(req,res)) return ;
	switch(req.method) {
		case 'GET':
			res.status(200).json({message: 'ok'});
			break;
		case 'POST':
			try {
				const providedKey = req.headers['x-api-key'];
				if (providedKey !== process.env.API_KEY) {
					return res.status(401).json({ message: 'Unauthorized' });
				}
				if (!req?.body?.value) {
					return res.status(400).json({ message: 'Value required'});
				}
				await connectDB();
				const normalizedValue = req.body.value.trim();
				const search = {value: { $regex: `^${normalizedValue}$`, $options: 'i' }};
				const dupes = await Square.findOne(search);
				if (dupes !== null) {
					res.status(400).json({message: 'Square already exists'});
				}
				const newSquare = await Square.create({
					value: normalizedValue
				});
				res.status(201).json(newSquare);
			} catch (err) {
				res.status(500).json({message: err.message})
			}

			break;
		default: 
			res.setHeader('Allow', ['GET','POST']);
			return res.status(405).json({message: 'Method Not Allowed'});
	}
}

