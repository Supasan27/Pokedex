import express, { response } from "express";
import axios from "axios";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
const API_URL = "https://pokeapi.co/api/v2/pokemon/";

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("index.ejs");
});

app.post("/submit", async (req, res) => {
  const getName = req.body.name;
  try {
    const result = await axios.get(API_URL + getName);
    res.render("index.ejs", {
      name: result.data.name,
      image: result.data.sprites.other["official-artwork"].front_default,
    });
  } catch (err) {
    res.render("index.ejs", { name: "Not found!", image: "" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
