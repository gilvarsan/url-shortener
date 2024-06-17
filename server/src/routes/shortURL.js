const express = require("express");
const router = express.Router();
const {
  listShortURLs,
  getShortURL,
  createShortURL,
  updateShortURL,
  deleteShortURL,
} = require("../components/shortURL/controllerShortURL");

router.get("/", listShortURLs);

router.get("/:id", getShortURL);

router.post("/", createShortURL);

router.patch("/:id", updateShortURL);

router.delete("/:id", deleteShortURL);

module.exports = router;
