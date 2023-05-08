import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: null,
};

export const ulogiraniKorisnikSlice = createSlice({
  name: "korisnik",
  initialState,
  reducers: {
    dodajKorisnika: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { dodajKorisnika } = ulogiraniKorisnikSlice.actions;

export default ulogiraniKorisnikSlice.reducer;
