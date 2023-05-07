import User from "../Models/user.js";
import jwt from "jsonwebtoken";
import Duznik from "../Models/duznik.js";
import Proizvod from "../Models/proizvod.js";

export const dodajDuznika = async (req, res) => {
  const { ime, prezime } = req.body;

  const noviDuznik = await Duznik.create({
    ime,
    prezime,
  });

  res.json(noviDuznik);
};

export const popisDuznika = async (req, res) => {
  const sviDuznici = await Duznik.find();

  res.json(sviDuznici);
};

export const dodajDug = async (req, res) => {
  const { imeProizvoda, sifraProizvoda, id } = req.body;

  const noviProizvod = await Proizvod.create({
    ime: imeProizvoda,
    sifra: sifraProizvoda,
  });

  const duznik = await Duznik.findById(id);

  duznik.popisProizvoda.push(noviProizvod._id);

  await duznik.save();

  res.json(duznik.popisProizvoda);
};

export const sviDugoviDuznika = async (req, res) => {
  const { id } = req.body;
  const sviDugovi = await Duznik.findById(id).populate(
    "popisProizvoda",
    "ime sifra"
  );
  console.log(sviDugovi);
  console.log("da");

  res.json(sviDugovi.popisProizvoda);
};
