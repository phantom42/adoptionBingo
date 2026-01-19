export async function getAllSquares() {
	const API_BASE = import.meta.env.VITE_API_ENDPOINT;
	const res = await fetch(`${API_BASE}/api/bingo/squares/`);
	const newBoard = await res.json();
	return newBoard;
}