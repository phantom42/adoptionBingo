import { getNewBoard } from "../api/getNewBoard.js";
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
  const [userBoard, setUserBoard] = useState(() => {
	const saved = localStorage.getItem("userBoard");
	return saved 
	? JSON.parse(saved)
    : {board: [], user: 0, id: ""}
  });

  const handleNewBoardClick = async (e) => {
    e.preventDefault();
    const newBoard = await getNewBoard();
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
  };

	function checkWin(board) {
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
	if (userBoard.board.length === 25) {
		localStorage.setItem("userBoard", JSON.stringify(userBoard));
	}
  }, [userBoard]);


  if (userBoard.board.length !== 25) {
    return (
      <div>
        <button onClick={handleNewBoardClick}>New Board</button>
      </div>
    );
  }

  return (
    <div>
      <button onClick={handleNewBoardClick}>New Board</button>
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
        {ROWS.map((row) =>
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
		</div>
  );
}
