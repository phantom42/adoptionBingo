export async function saveBoard(userBoard, token) {
const API_BASE = import.meta.env.VITE_API_ENDPOINT;
	const res = await fetch(`${API_BASE}/api/bingo/board`,{
		method: 'POST',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json',
			'Authorization': `Bearer ${token}`
		},
		body: JSON.stringify(userBoard)
	});
	const result = await res.json();
	
	return result;
}