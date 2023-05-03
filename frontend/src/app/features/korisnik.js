import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: {},
};

export const ulogiraniKorisnikSlice = createSlice({
  name: "korisnik",
  initialState,
  reducers: {
    dodajKorsnika: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { dodajKorsnika } = ulogiraniKorisnikSlice.actions;

export default ulogiraniKorisnikSlice.reducer;
