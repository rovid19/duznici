import mongoose from "mongoose";

const proizvodSchema = new mongoose.Schema({
  ime: String,
  sifra: String,
  kolicina: { default: 0, type: Number },
  povijestPosudbe: [],
  cijena: { default: 0, type: Number },
});

const proizvodModel = mongoose.model("proizvod", proizvodSchema);

export default proizvodModel;
