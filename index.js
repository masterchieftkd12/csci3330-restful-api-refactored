import express from "express"

const app = express();
const port = 3000;

app.use(express.json());

function isGoodStringParam(param){
  return  typeof param === "string" && param.trim().length > 0;
}

function isGoodNumericParam(param){
  return  typeof param === "number" && Number.isFinite(param);
}

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

app.get("/", (req, res) => {
    res.status(200).send("<h1>Request received!</h1><h2>Hello from server app</h2>");
});
app.post("/", (req, res)=>{
    res.status(200).send("3330: Post success");
});



// GET request to retrieve all games
// Test: GET http://localhost:3000/api/games
app.get("/api/games", (req, res)=>{
  res.status(200).json(games);
});



// GET request to retrieve a single game by ID
// Test: GET http://localhost:3000/api/game/3
app.get("/api/game/:id", (req, res)=>{
  const id = Number(req.params.id);
  const game = games.find((game) => game.id === id);

  if(!game){
    return res.status(404).json({message: "Game not found!"});
  }

  res.status(200).json(game);
});


// POST request to create a new game
//Test: POST http://localhost:3000/api/game/
app.post("/api/game", (req, res)=>{
    const { title, publisher, releaseYear, ageRating, price, imageUrl } = req.body;
    // validate Params
    if ( !isGoodStringParam(title) || !isGoodNumericParam(price) ){
        return res.status(400).json({
          message: "Game title and price are required fields"
        });
    }

    // Create a new game with the next available id and add it to the collection
    const newId = games.length > 0 ? Math.max(...games.map((g) => g.id)) + 1 : 1;
    const newGame = { id: newId, title, publisher, releaseYear, ageRating, price, imageUrl };
    games.push(newGame);

    res.status(201).json(newGame);
});


// PUT request to update an entire game
app.put("/api/game/:id", (req, res) => {
    const id = Number(req.params.id);
    const game = games.find( (game) => game.id === id);

    if(!game){
      return res.status(404).json({ message: "Game not found!" });
    }
    const { title, price } = req.body;
    // validate Params
    if ( !isGoodStringParam(title) || !isGoodNumericParam(price) ){
        return res.status(400).json({
          message: "Game title and price are required fields"
        });
    }

    //TODO: replace all data elements coming from the PUT request
    
    res.status(200).json(game);

});


// PATCH request to partially update a game
app.patch("/api/game/:id", (req, res) => {
    const id = Number(req.params.id);
    const game = games.find((game) => game.id === id);

    if (!game) {
        return res.status(404).json({ message: "Game not found!" });
    }

    const { title, price } = req.body;

    // Check whether the title field was provided, if so updated it!
    if (title !== undefined) { 
        if (!isGoodStringParam(title)) {
            return res.status(400).json({
                message: "Invalid game title"
            });
        }

        // TODO: udpate the game's title
        
    }

    // Check whether the price field was provided, if so updated it!
    if (price !== undefined) {
        if (!isGoodNumericParam(price)) {
            return res.status(400).json({
                message: "Invalid game price"
            });
        }

        // TODO: udpate the game's price
    }

    res.status(200).json(game);
});

// DELETE request to remove a game from the collection
app.delete("/api/game/:id", (req, res) => {
    const id = Number(req.params.id);
    const gameIx = games.findIndex( (game) => game.id === id);

    if(gameIx  === -1){
        return res.status(404).json({ message: "User not found" });
    }
    
    // TODO: delete the item from the collection

    res.status(204).send();
});


app.listen(port, ()=> {
    console.log(`Server started listening on port ${port}`);
});