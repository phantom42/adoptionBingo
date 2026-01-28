import { createClerkClient } from "@clerk/backend";

const clerkClient = createClerkClient({
	secretKey: process.env.CLERK_SECRET_KEY,
	publishableKey: process.env.VITE_CLERK_PUBLISHABLE_KEY
})

export default function buildRequest(req) {
	const protocol = req.headers['x-forwarded-proto'] || 'http';
	const host = req.headers.host;
	const url = `${protocol}://${host}${req.originalUrl || req.url}`;

	return new Request (url, {
		method: req.method,
		headers: new Headers(req.headers),
		body: req.method === 'GET' || req.method === 'HEAD'
		? undefined
		: JSON.stringify(req.body),
	})
}

export async function getAuthFromRequest(req) {
	const clerkReq = buildRequest(req);

	const authResult = await clerkClient.authenticateRequest(clerkReq);
	const isAuthenticated = authResult.isAuthenticated;
	const auth = authResult.toAuth();
	
	return {
		isAuthenticated,
		userId: auth?.userId ?? null
	}
}