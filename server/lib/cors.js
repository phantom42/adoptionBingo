export function setCors(req, res) {
	const origin = req.headers.origin;
	console.log("CORS origin:", origin);

	const ALLOWED_ORIGINS = [
		"https://adoptionbingo.com",
		"https://www.adoptionbingo.com",
		"https://adopteebingo.com",
		"https://adopteebingo.com",
		"https://adoption-bingo-react-git-staging-phantom42s-projects.vercel.app",
		"https://adoption-bingo-react.vercel.app",
		"http://localhost:5173"
	]

	if (ALLOWED_ORIGINS.includes(origin)) {
		res.setHeader("Access-Control-Allow-Origin", origin);
	}

	res.setHeader("Access-Control-Allow-Credentials", "true");
	res.setHeader(
		"Access-Control-Allow-Headers", 
		"Content-Type, Authorization"
	);

	res.setHeader(
		"Access-Control-Allow-Methods",
		"GET, POST,OPTIONS"
	)

	if (req.method === "OPTIONS") {
		console.log("OPTIONS preflight handled");
		res.status(200).end();
		return true;
	}
	return false;
}
