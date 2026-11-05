import express from "express";
import gamesRouter from "./routes/games.js"; // import the games router

const app = express();
const port = 3000;

app.use(express.json());

// General (non-game) routes stay here
app.get("/", (req, res) => {
  res.status(200).send("<h1>Request received!</h1><h2>Hello from server app</h2>");
});

app.post("/", (req, res) => {
  res.status(200).send("3330: Post success");
});

// Mount the games router at /api
// All game routes are now handled in routes/games.js
app.use("/api", gamesRouter);

app.listen(port, () => {
  console.log(`Server started listening on port ${port}`);
});