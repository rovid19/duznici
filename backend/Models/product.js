import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  ime: String,
  sifra: String,
  cijena: { default: 0, type: Number },
});

const productModel = mongoose.model("product", productSchema);

export default productModel;
