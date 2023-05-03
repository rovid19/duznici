import express from "express";
import { createUser, loginUser, logoutUser } from "../Controllers/auth.js";

const router = express.Router();

router.post("/create-user", createUser);

router.post("/login-user", loginUser);

router.post("/logout-user", logoutUser);

export default router;
