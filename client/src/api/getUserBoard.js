export async function getUserBoard(user=0, getToken) {
	const API_BASE = import.meta.env.VITE_API_ENDPOINT;
	let headers = {
			'Accept': 'application/json',
			'Content-Type': 'application/json',
		}
	if (getToken) {
		const token = await getToken() ;
		headers.Authorization = `Bearer ${token}`
	}
	const res = await fetch(`${API_BASE}/api/bingo/boards/user?userId=${user}`,{
		method: 'GET',
		headers,
		
	});
	const userBoard = await res.json();
	if (!userBoard) return false ;
	return userBoard;
}