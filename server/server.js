// server.js in root
import express from "express";
import boardHandler from "./api/bingo/board.js";
import squareHandler from './api/bingo/square.js';
import squaresHandler from './api/bingo/squares.js';
import cors from 'cors';

const app = express();
app.use(cors({
	origin: true, // IMPORTANT: reflect request origin
	methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
	allowedHeaders: ['Content-Type', 'Authorization', 'X-API-Key']
}));

app.use(express.json());
app.all("/api/bingo/board", (req, res) => boardHandler(req, res));
app.all("/api/bingo/square", (req, res) => squareHandler(req, res));
app.get("/api/bingo/squares", (req, res) => squaresHandler(req, res));

app.listen(3000, () => console.log("API running on http://localhost:3000"));
