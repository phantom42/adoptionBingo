import {nanoid} from 'nanoid';
import SquareModel from "../models/Square.js";
import {arrayToShuffled} from "array-shuffle";
import BoardModel from '../models/Board.js';

const COLUMNS = ['b','i','n','g','o'];
const ROWS = [1,2,3,4,5];

export async function generateBoard(user = '0',saveToDb = false){
	try {
		const emptyBoard = generateEmptyBoard();
		
		const allSquares = await SquareModel.find({active: true})
		if (!allSquares) {
			return {message: 'not enough squares'};
		}
		const shuffledSquares = arrayToShuffled(allSquares);
		for (const [index, square]  of emptyBoard.entries()) {
			emptyBoard[index].value = shuffledSquares[index].value;
		}
	
		const finalBoard = {
			'user': user,
			'board': replaceCenterSquareValue(emptyBoard),
			'id': nanoid()
		}
		if (user !== '0' && saveToDb) {
			const saved = await saveBoard(finalBoard);
		}
		return finalBoard;
		
			
	} catch (err) {
		return ({saved: false, message: err.message});
	}
	
}
export function generateEmptyBoard() {
	const board = [];
	for (const column of COLUMNS) {
		
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

export async function saveBoard(userBoard){
	try {
		if (!userBoard) return ({ok: false, message: 'no board to save'});
		if (!userBoard.user?.length) return ({ok: false, message: 'no valid user'});
		const existing  = await BoardModel.findOne({user: userBoard.user});
		if (!existing) {
			const result = await BoardModel.create(userBoard);
		} else {
			existing.board = userBoard.board;
			const savedBoard = await existing.save();
			return ({saved: true, message: savedBoard});
		}
		return ({saved: true, message: 'ok'});
	} catch (err) {
		console.log(err);
		return ({ saved: false, message: err.message});
	}
}

export function replaceCenterSquareValue(board) {
	const space = Math.floor((ROWS.length * COLUMNS.length) / 2);
	board[space].value = 'Be Grateful For A Free Space';
	board[space].marked = true;
	board[space].free = true ;
	board[space].win = false;
	return board;
}

export async function getUserBoard(userId) {
	const userBoard = await BoardModel.findOne({user: userId});
	if (!userBoard) return false;
	return userBoard;
}