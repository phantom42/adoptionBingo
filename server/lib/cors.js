export function setCors(req, res) {
	const origin = req.headers.origin || req.headers.referer;
	console.log("CORS origin:", origin);
	console.log('req',req);
	console.log('headers',req.headers);

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
		"Access-Control-Allow-Methods",
		"GET, POST, OPTIONS"
	)
	
	if (req.method === "OPTIONS") {
		console.log("OPTIONS preflight handled");
		res.status(200).end();
		res.setHeader(
			"Access-Control-Allow-Headers", 
			"Content-Type, X-Requested-With"
		);
		return true;
	} else {
		res.setHeader(
			"Access-Control-Allow-Headers", 
			"Content-Type, Authorization, X-Requested-With"
		);
		
	}
	return false;
}
