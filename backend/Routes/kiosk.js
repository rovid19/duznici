import express from "express";
import {
  dodajDuznika,
  popisDuznika,
  dodajDug,
  sviDugoviDuznika,
  brisanjeDuga,
  dodajJedan,
  oduzmiJedan,
  obrisiDuznika,
  crnaLista,
  setTotal,
  sviProizvodi,
} from "../Controllers/kiosk.js";

const router = express.Router();

router.post("/dodaj-duznika", dodajDuznika);

router.get("/popis-duznika", popisDuznika);

router.post("/dodaj-dug", dodajDug);

router.post("/dug-duznika", sviDugoviDuznika);

router.post("/brisanje-duga", brisanjeDuga);

router.post("/dodaj-jedan", dodajJedan);

router.post("/oduzmi-jedan", oduzmiJedan);

router.post("/obrisi-duznika", obrisiDuznika);

router.post("/crna-lista", crnaLista);

router.post("/set-total", setTotal);

router.get("/svi-proizvodi", sviProizvodi);

export default router;
