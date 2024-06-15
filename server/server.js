// server/server.js
const express = require("express");
const mongoose = require("mongoose");
const app = express();
const cors = require("cors");
const port = 3001;

// Conectar a MongoDB
/*mongoose.connect("mongodb://localhost:27017/urlshortener", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const urlSchema = new mongoose.Schema({
  originalUrl: String,
  shortUrl: String,
});

const Url = mongoose.model("Url", urlSchema);*/

app.use(express.json());
app.use(cors());

app.get("/api/shorten", (req, res) => {
  const response = {
    data: "shorten get 1",
  };
  res.json({ response });
});

app.post("/api/shorten", async (req, res) => {
  //const baseURL = `${req.protocol}://${req.get("host")}/`;
  const referer = req.get("Referer") || req.get("Origin");
  let baseURL = referer ? new URL(referer).origin : null;
  console.log("Base URL:", baseURL);
  const { longUrl, description } = req.body;
  const shortUrl = baseURL + "/" + Math.random().toString(36).substr(2, 6);
  /*const url = new Url({ originalUrl, shortUrl });
  await url.save();*/
  res.json({ shortUrl, description });
});

app.get("/:shortUrl", async (req, res) => {
  /*const { shortUrl } = req.params;
  const url = await Url.findOne({ shortUrl });
  if (url) {
    res.redirect(url.originalUrl);
  } else {
    res.status(404).json({ error: "URL not found" });
  }*/
  const response = {
    data: "shorten get 3",
  };
  res.json({ response });
});

app.listen(port, () => {
  console.log(`Backend running at http://localhost:${port}`);
});
