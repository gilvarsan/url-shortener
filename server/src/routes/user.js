import express from "express";
const router = express.Router();
import {
  getUserByEmail,
  createUser,
} from "../components/user/controllerUser.js";

router.get("/:email", getUserByEmail);

router.post("/", createUser);

export default router;
