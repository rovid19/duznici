import { configureStore } from "@reduxjs/toolkit";
import ulogiraniKorisnikReducer from "./features/korisnik";

export const store = configureStore({
  reducer: {
    korisnik: ulogiraniKorisnikReducer,
  },
});
