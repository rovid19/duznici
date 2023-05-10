import mongoose from "mongoose";

const duznikSchema = new mongoose.Schema({
  ime: String,
  prezime: String,
  totalDug: { default: 0, type: Number },
  blacklist: { default: false, type: Boolean },
  popisProizvoda: [{ type: mongoose.Schema.Types.ObjectId, ref: "proizvod" }],
});

const duznikModel = mongoose.model("duznik", duznikSchema);

export default duznikModel;
