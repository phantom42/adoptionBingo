import { useUser, useAuth } from "@clerk/clerk-react";
import { getNewBoard } from "../api/getNewBoard.js";
import { getUserBoard} from '../api/getUserBoard.js';
import { saveBoard } from "../api/saveBoard.js";
import About from "./About.jsx";
import Header from "./Header.jsx";
import Footer from "./Footer.jsx";
import { useState, useEffect, useMemo } from "react";

const ROWS = [1, 2, 3, 4, 5];
const COLUMNS = ["b", "i", "n", "g", "o"];
const WIN_COMBINATIONS = [
	["b1", "i1", "n1", "g1", "o1"],
	["b2", "i2", "n2", "g2", "o2"],
	["b3", "i3", "n3", "g3", "o3"],
	["b4", "i4", "n4", "g4", "o4"],
	["b5", "i5", "n5", "g5", "o5"],

	["b1", "b2", "b3", "b4", "b5"],
	["i1", "i2", "i3", "i4", "i5"],
	["n1", "n2", "n3", "n4", "n5"],
	["g1", "g2", "g3", "g4", "g5"],
	["o1", "o2", "o3", "o4", "o5"],

	["b1", "i2", "n3", "g4", "o5"],
	["b5", "i4", "n3", "g2", "o1"]
]

export default function Board() {

	const { user, isLoaded, isSignedIn} = useUser();
	const { getToken } = useAuth();

	const activeUser = isLoaded && isSignedIn ? user.id : '';
  	const [userBoard, setUserBoard] = useState(() => {
		const local = localStorage.getItem("userBoard");
		return local 
			? JSON.parse(local)
			: {board: [], user: activeUser, id: ""}
		}
	);
	
	const handleNewBoardClick = async (e) => {
		e.preventDefault();
	
		const newBoard = await getNewBoard(activeUser, getToken);
    	setUserBoard(newBoard);
  	};

	const toggleSquare = (id) => {
		/* loop through each square. if it is the correct square and is not the center/free square */
		setUserBoard((prev) => ({
      		...prev,
      		board: prev.board.map((square) =>
        		square.id === id && !square.free
          			? { ...square, marked: !square.marked }
          			: square
      		),
	    }));
		saveUserBoard();
  	};
	const saveUserBoard = async ()=> {
		if (!isSignedIn){
			setUserBoard(prev => {
				return {...prev, user: 0}
			})
		} 
		if (!isSignedIn) return false;
		const token = await getToken();
		saveBoard(userBoard, token);
	
		return true;
	}

	function checkWin(board) {
		if (board === undefined) {
			return false;
		}
		const markedIds = new Set(
			board.filter(s => s.marked).map(s => s.id)
		);

		return WIN_COMBINATIONS.some(combo =>
			combo.every(id => markedIds.has(id))
		);
	}

	const hasWon = useMemo(() => {
		return checkWin(userBoard.board);
	}, [userBoard.board]);

	useEffect(() => {
		if ( !isLoaded) return;
		if (!isSignedIn) return ;
	
		async function load() {
			console.log('loading');
			const existingBoard = await getUserBoard(user.id, getToken);
			console.log(existingBoard);
			console.log(existingBoard.board, existingBoard.board.length);
			if (existingBoard.board && existingBoard.board.length === 25){
				console.log('valid board');
				setUserBoard(existingBoard);
			} 
		}
		load();
	}, [isSignedIn, isLoaded, user?.id, getToken])

	useEffect(() => {
		if (userBoard.board && userBoard.board.length === 25) {
			localStorage.setItem("userBoard", JSON.stringify(userBoard));
		}
	}, [userBoard]);


	if (!userBoard?.board || (userBoard.board && userBoard.board.length < 25)) {
		return <About handleNewBoardClick={handleNewBoardClick} />
	}


	const hasBoard = userBoard.board.length > 0;
	return (
		<>
		<Header showNewBoard={hasBoard} onNewBoard={handleNewBoardClick} />
		<div>
			{!hasBoard && (
			<button onClick={handleNewBoardClick}>
				New Board
			</button>
			)}
			{hasWon && (
				<div className="pyro">
					<div className="before"></div>
					<div className="after"></div>
				</div>
			)}
			<div className="boardContainer">
				<div id="bingoCard">
					<div className="adoptionHeader">ADOPTION</div>
					{/* Header */}
					{COLUMNS.map((col) => (
					<div key={col} className="bingoHeader">
						{col.toUpperCase()}
					</div>
					))}

					{/* Squares */}
					{userBoard.board && userBoard.board.length ===25 && ROWS.map((row) =>
					COLUMNS.map((column) => {
						const square = userBoard.board.find(
						(s) => s.column === column && s.row === row
						);

						return (
						<div
							key={square.id}
							className={`square ${square.marked ? "marked" : ""} ${
							square.free ? "free" : ""
							}`}
							onClick={() => toggleSquare(square.id)}
						>
							{square.value}
						</div>
						);
					})
					)}
				</div>
			</div>
			<Footer/>
		</div>
		</>
  	);
}
