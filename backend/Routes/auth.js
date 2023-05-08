import express from "express";
import {
  createUser,
  getUser,
  loginUser,
  logoutUser,
} from "../Controllers/auth.js";

const router = express.Router();

router.post("/create-user", createUser);

router.post("/login-user", loginUser);

router.post("/logout-user", logoutUser);

router.get("/get-user", getUser);

export default router;
