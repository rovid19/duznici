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
  const sviDuznici = await Duznik.find().populate(
    "popisProizvoda",
    "ime sifra kolicina povijestPosudbe cijena"
  );

  res.json(sviDuznici);
};

export const dodajDug = async (req, res) => {
  const { imeProizvoda, sifraProizvoda, id, cijenaProizvoda } = req.body;

  const noviProizvod = await Proizvod.create({
    ime: imeProizvoda,
    sifra: sifraProizvoda,
    cijena: cijenaProizvoda,
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
    "ime sifra kolicina povijestPosudbe cijena"
  );

  res.json(sviDugovi.popisProizvoda);
};

export const brisanjeDuga = async (req, res) => {
  const { idProizvoda, id } = req.body;

  const proizvod = await Proizvod.findByIdAndDelete(idProizvoda);

  const duznik = await Duznik.findById(id);

  const filter = duznik.popisProizvoda.filter(
    (item) => item._id.toString() !== idProizvoda.toString()
  );

  duznik.set({
    popisProizvoda: filter,
  });
  console.log(filter);

  await duznik.save();

  res.json(duznik.popisProizvoda);
};

export const dodajJedan = async (req, res) => {
  const { idProizvoda, formatiraniDate, radnik } = req.body;

  const dodajObject = {
    datum: formatiraniDate,
    radnik: radnik,
  };

  const proizvod = await Proizvod.findById(idProizvoda);

  proizvod.povijestPosudbe.push(dodajObject);

  await proizvod.save();

  res.json(proizvod);
};

export const oduzmiJedan = async (req, res) => {
  const { idProizvoda } = req.body;

  const proizvod = await Proizvod.findById(idProizvoda);

  const newArray = proizvod.povijestPosudbe.splice(0, 1);

  await proizvod.save();
  res.json(proizvod);
};

export const obrisiDuznika = async (req, res) => {
  const { id } = req.body;

  const obrisiDuznika = await Duznik.findByIdAndDelete(id);

  res.json("ok");
};
export const crnaLista = async (req, res) => {
  const { id } = req.body;

  const duznik = await Duznik.findById(id);
  const { blacklist } = duznik;
  const kontraVal = !blacklist;
  duznik.set({
    blacklist: kontraVal,
  });

  await duznik.save();

  res.json(duznik);
};

export const setTotal = async (req, res) => {
  const { total, id } = req.body;

  const duznik = await Duznik.findById(id);

  duznik.set({
    totalDug: total,
  });

  await duznik.save();

  res.json(duznik);
};
