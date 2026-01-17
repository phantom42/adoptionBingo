import {nanoid} from 'nanoid';
import SquareModel from "../models/Square.js";
import {arrayToShuffled} from "array-shuffle";

const COLUMNS = ['b','i','n','g','o'];
const ROWS = [1,2,3,4,5];

export async function generateBoard(user = ''){

	const emptyBoard = generateEmptyBoard();
	
	const allSquares = await SquareModel.find({active: true})
	if (!allSquares) {
		return {message: 'not enough squares'};
	}
	const test = await SquareModel.findById('6961731b85f0ba5c9386521b');
	const shuffledSquares = arrayToShuffled(allSquares);
	for (const [index, square]  of emptyBoard.entries()) {
		emptyBoard[index].value = shuffledSquares[index].value;
	}

	const finalBoard = {
		'user': user,
		'board': replaceCenterSquareValue(emptyBoard),
		'id': nanoid()
	}
	return finalBoard;
	
}
export function generateEmptyBoard() {
	const board = [];
	for (const column of COLUMNS) {
		board[column] = {};
		
		for (const row of ROWS) {
			board.push({
				id: `${column}${row}`,
				column,
				row,
				value: null,
				marked: false,
				free: false,
				win: false
			})
		}
	}
	return board;

}

export function replaceCenterSquareValue(board) {
	const space = Math.floor((ROWS.length * COLUMNS.length) / 2);
	board[space].value = 'Be Grateful For A Free Space';
	board[space].marked = true;
	board[space].free = true ;
	board[space].win = false;
	return board;
}