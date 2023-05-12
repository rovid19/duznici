import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import { fileURLToPath } from "url";
import path from "path";
import authRoutes from "../backend/Routes/auth.js";
import kioskRoutes from "../backend/Routes/kiosk.js";

const app = express();
const PORT = 5000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();
mongoose.connect(process.env.MONGOOSE_CONNECT);

app.use(cookieParser());
app.use(
  cors({
    credentials: true,
    origin: ["http://localhost:5173" /*, "https://kioskfront.onrender.com"*/],
  })
);
app.use(express.json());
app.listen(PORT);

app.use("/api/auth", authRoutes);
app.use("/api/kiosk", kioskRoutes);
