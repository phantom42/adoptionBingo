// server.js in root
import express from "express";
import boardHandler from "./api/bingo/board.js";

const app = express();

// Wrap your Vercel handler for Express
app.get("/api/bingo/board", (req, res) => boardHandler(req, res));

app.listen(3000, () => console.log("API running on http://localhost:3000"));
