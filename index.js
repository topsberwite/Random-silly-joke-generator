import express from "express";
import axios from "axios";

const app = express();
const port = 3000;
const API_URL = "https://official-joke-api.appspot.com/jokes/random";

app.use(express.static("public"));


app.get("/", (req, res) => {
  res.render("index.ejs");
});

app.post("/jokes", async (req,res) => {
  try {
    const response = await axios.get(API_URL);
    const result = response.data;
    console.log(result);
    res.render("index.ejs", {
      jokes: result.setup + " " + result.punchline
    });
  } catch (error) {
    console.log(error.response.data);
    res.status(500);
  }
});

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`)
})