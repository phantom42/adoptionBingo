export async function getNewBoard() {
	const res = await fetch('/api/bingo/board/');
	const newBoard = await res.json();
	return newBoard;
}