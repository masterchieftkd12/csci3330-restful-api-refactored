import express from "express";

// Create a router (a "mini app" that only handles game routes)
const router = express.Router();

// ===== Helper functions =====
function isGoodStringParam(param){
  return typeof param === "string" && param.trim().length > 0;
}

function isGoodNumericParam(param){
  return typeof param === "number" && Number.isFinite(param);
}

// ===== Game data =====
const games = [
  {
    id: 1,
    title: "The Legend of Zelda: Breath of the Wild",
    publisher: "Nintendo",
    releaseYear: 2017,
    ageRating: "E10+",
    price: 59.99,
    imageUrl: "https://placehold.co/300x400?text=Breath+of+the+Wild"
  },
  {
    id: 2,
    title: "God of War Ragnarök",
    publisher: "Sony Interactive Entertainment",
    releaseYear: 2022,
    ageRating: "M",
    price: 69.99,
    imageUrl: "https://placehold.co/300x400?text=God+of+War+Ragnarok"
  },
  {
    id: 3,
    title: "Halo Infinite",
    publisher: "Xbox Game Studios",
    releaseYear: 2021,
    ageRating: "T",
    price: 59.99,
    imageUrl: "https://placehold.co/300x400?text=Halo+Infinite"
  },
  {
    id: 4,
    title: "Minecraft",
    publisher: "Mojang Studios",
    releaseYear: 2011,
    ageRating: "E10+",
    price: 29.99,
    imageUrl: "https://placehold.co/300x400?text=Minecraft"
  },
  {
    id: 5,
    title: "Super Mario Odyssey",
    publisher: "Nintendo",
    releaseYear: 2017,
    ageRating: "E",
    price: 59.99,
    imageUrl: "https://placehold.co/300x400?text=Super+Mario+Odyssey"
  }
];

// ===== Routes =====
// NOTE: This router is mounted at "/api" in index.js,
// so "/games" here becomes "/api/games" in the browser.

// GET all games
// Test: GET http://localhost:3000/api/games
router.get("/games", (req, res) => {
  res.status(200).json(games);
});

// GET a single game by ID
// Test: GET http://localhost:3000/api/game/3
router.get("/game/:id", (req, res) => {
  const id = Number(req.params.id);
  const game = games.find((game) => game.id === id);

  if (!game) {
    return res.status(404).json({ message: "Game not found!" });
  }

  res.status(200).json(game);
});

// POST create a new game
// Test: POST http://localhost:3000/api/game
router.post("/game", (req, res) => {
  const { title, publisher, releaseYear, ageRating, price, imageUrl } = req.body;

  if (!isGoodStringParam(title) || !isGoodNumericParam(price)) {
    return res.status(400).json({
      message: "Game title and price are required fields"
    });
  }

  const newId = games.length > 0 ? Math.max(...games.map((g) => g.id)) + 1 : 1;
  const newGame = { id: newId, title, publisher, releaseYear, ageRating, price, imageUrl };
  games.push(newGame);

  res.status(201).json(newGame);
});

// PUT update an entire game
// Test: PUT http://localhost:3000/api/game/4
router.put("/game/:id", (req, res) => {
  const id = Number(req.params.id);
  const game = games.find((game) => game.id === id);

  if (!game) {
    return res.status(404).json({ message: "Game not found!" });
  }

  const { title, publisher, releaseYear, ageRating, price, imageUrl } = req.body;

  if (!isGoodStringParam(title) || !isGoodNumericParam(price)) {
    return res.status(400).json({
      message: "Game title and price are required fields"
    });
  }

  game.title = title;
  game.publisher = publisher;
  game.releaseYear = releaseYear;
  game.ageRating = ageRating;
  game.price = price;
  game.imageUrl = imageUrl;

  res.status(200).json(game);
});

// PATCH partially update a game
// Test: PATCH http://localhost:3000/api/game/5
router.patch("/game/:id", (req, res) => {
  const id = Number(req.params.id);
  const game = games.find((game) => game.id === id);

  if (!game) {
    return res.status(404).json({ message: "Game not found!" });
  }

  const { title, price } = req.body;

  if (title !== undefined) {
    if (!isGoodStringParam(title)) {
      return res.status(400).json({ message: "Invalid game title" });
    }
    game.title = title;
  }

  if (price !== undefined) {
    if (!isGoodNumericParam(price)) {
      return res.status(400).json({ message: "Invalid game price" });
    }
    game.price = price;
  }

  res.status(200).json(game);
});

// DELETE remove a game
// Test: DELETE http://localhost:3000/api/game/2
router.delete("/game/:id", (req, res) => {
  const id = Number(req.params.id);
  const gameIx = games.findIndex((game) => game.id === id);

  if (gameIx === -1) {
    return res.status(404).json({ message: "Game not found!" });
  }

  games.splice(gameIx, 1);

  res.status(204).send();
});

// Export the router so index.js can use it
export default router;