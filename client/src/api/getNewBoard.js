export async function getNewBoard(user=0, getToken) {
	const API_BASE = import.meta.env.VITE_API_ENDPOINT;
	let headers = {
		'Accept': 'application/json',
		'Content-Type': 'application/json',
	}
	if (getToken) {
		const token = await getToken() ;
		headers.Authorization = `Bearer ${token}`
	}
	const res = await fetch(`${API_BASE}/api/bingo/board?userId=${user}`,{
		method: 'GET',
		headers,
		}
	);
	const newBoard = await res.json();
	const finalBoard = {...newBoard, user: user}
	//newBoard.user = user;
	return finalBoard;
}