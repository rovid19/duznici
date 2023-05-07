import express from "express";
import {
  dodajDuznika,
  popisDuznika,
  dodajDug,
  sviDugoviDuznika,
} from "../Controllers/kiosk.js";

const router = express.Router();

router.post("/dodaj-duznika", dodajDuznika);

router.get("/popis-duznika", popisDuznika);

router.post("/dodaj-dug", dodajDug);

router.post("/dug-duznika", sviDugoviDuznika);

export default router;
