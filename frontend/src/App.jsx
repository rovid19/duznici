import React, { useEffect } from "react";
import Layout from "./Layout.jsx";
import { Route, Routes } from "react-router";
import Duznici from "../src/components/SubPages/Dužnici/Duznici.jsx";
import Nabava from "../src/components/SubPages/Nabava/Nabava.jsx";
import Prijava from "./components/SubPages/Prijava/Prijava.jsx";
import Registracija from "./components/SubPages/Prijava/Registracija.jsx";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { dodajKorisnika } from "../src/app/features/korisnik.js";

axios.defaults.baseURL = "http://localhost:5000";
//axios.defaults.baseURL = "https://ecommerce-api-px36.onrender.com";
axios.defaults.withCredentials = true;

const App = () => {
  const dispatch = useDispatch();
  const korisnik = useSelector((state) => state.korisnik.value);

  console.log(korisnik);
  useEffect(() => {
    axios
      .get("/api/auth/get-user?timestamp=" + new Date().getTime())
      .then(({ data }) => {
        dispatch(dodajKorisnika(data));
      });
  }, []);
  console.log(korisnik);
  return (
    <div>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Prijava />} />
          <Route path="/duznici" element={<Duznici />} />
          <Route path="/nabava" element={<Nabava />} />
          <Route path="/registracija" element={<Registracija />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
