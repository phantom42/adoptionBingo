import SquareModel from "../models/Square.js";
export async function getAllSquares(){
	const allSquares = await SquareModel.find({active: true}).sort('value');
	return allSquares;
}