import express from "express";
const router = express.Router();
import {
  listShortURLs,
  getShortURL,
  createShortURL,
  updateShortURL,
  deleteShortURL,
} from "../components/shortURL/controllerShortURL.js";

router.get("/:email", listShortURLs);

router.get("/:id", getShortURL);

router.post("/", createShortURL);

router.patch("/:id", updateShortURL);

router.delete("/:id", deleteShortURL);

export default router;
