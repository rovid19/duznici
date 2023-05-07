import React, { useEffect } from "react";
import Layout from "./Layout.jsx";
import { Route, Routes } from "react-router";
import Duznici from "../src/components/SubPages/Dužnici/Duznici.jsx";
import Nabava from "../src/components/SubPages/Nabava/Nabava.jsx";
import Prijava from "./components/SubPages/Prijava/Prijava.jsx";
import Registracija from "./components/SubPages/Prijava/Registracija.jsx";
import axios from "axios";
import { useSelector } from "react-redux";

axios.defaults.baseURL = "http://localhost:5000";
//axios.defaults.baseURL = "https://ecommerce-api-px36.onrender.com";
axios.defaults.withCredentials = true;

const App = () => {
  useEffect(() => {}, []);
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
