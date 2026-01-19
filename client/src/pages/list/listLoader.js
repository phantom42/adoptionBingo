import {getAllSquares} from '../../api/getAllSquares';
export async function listLoader(){
	const allSquares = await getAllSquares();
	return {
		allSquares
	};
}