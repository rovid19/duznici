import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { dodajKorisnika } from "../../app/features/korisnik";
import axios from "axios";
const Navbar = () => {
  const korisnik = useSelector((state) => state.korisnik.value);
  const dispatch = useDispatch();

  function handleLogout() {
    axios.post("/api/auth/logout-user").then(() => {
      dispatch(dodajKorisnika(null));
      navigate("/");
    });
  }

  console.log(korisnik);

  return (
    <div className="h-full w-full bg-white">
      <header className="w-full h-full">
        <div className="h-[20%] flex items-center justify-center">
          <Link to="/">
            <h1 className="text-5xl">LEVI</h1>
          </Link>
        </div>
        <nav className="h-[80%] relative">
          <ul className="h-[20%] fl text-2xl">
            <li>
              <Link to="/duznici">Dužnici</Link>
            </li>
            <li>
              <Link to="/nabava">Nabava</Link>
            </li>
            {korisnik && (
              <li onClick={handleLogout} className="absolute bottom-5 ">
                <h3 className="text-center text-base">{korisnik.username}</h3>
                <Link>Odjavi se</Link>
              </li>
            )}
          </ul>
        </nav>
      </header>
    </div>
  );
};

export default Navbar;
