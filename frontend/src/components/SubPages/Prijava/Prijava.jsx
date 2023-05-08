import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { dodajKorisnika } from "../../../app/features/korisnik";

const Registracija = () => {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();

  const korisnik = useSelector((state) => state.korisnik.value);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  function handleLogin(e) {
    e.preventDefault();
    axios
      .post("/api/auth/login-user", { username, password })
      .then(({ data }) => {
        navigate("/duznici");
        dispatch(dodajKorisnika(data));
      });
  }
  console.log(korisnik === true);
  return (
    <main className="fl h-full w-full relative">
      <Link to="/registracija" className="absolute bottom-5">
        Napravi račun
      </Link>
      <section className="h-[30%] w-[50%]  mt-5">
        {korisnik ? (
          <div className="h-full w-full flex justify-center items-center">
            <h1 className="text-4xl">{korisnik.username}, prijavljeni ste</h1>
          </div>
        ) : (
          <>
            <h2 className="text-5xl text-center">Prijavi se</h2>
            <form className="h-full w-full  fl2 mt-6" onSubmit={handleLogin}>
              <input
                type="text"
                placeholder="Ime"
                className="w-full bg-gray-50 h-[20%] text-center text-2xl"
                onChange={(e) => setUsername(e.target.value)}
              />
              <input
                type="password"
                placeholder="Šifra"
                className="w-full bg-gray-50 h-[20%] mt-2 text-center text-2xl"
                onChange={(e) => setPassword(e.target.value)}
              />
              <button className=" bg-orange-500 text-white rounded-md mt-6 w-[50%] h-[15%] hover:scale-95 transition-all">
                Prijava
              </button>
            </form>
          </>
        )}
      </section>
    </main>
  );
};

export default Registracija;
