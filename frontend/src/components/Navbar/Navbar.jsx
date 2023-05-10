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
    <div className="h-full w-full bg-cyan-50">
      <header className="w-full h-full">
        <div className="h-[20%] flex items-center justify-center">
          <Link to="/">
            <h1 className="text-5xl">LEVI</h1>
          </Link>
        </div>
        <nav className="h-[80%] relative w-full">
          <ul className="h-[20%] fl text-2xl w-full">
            <li className="w-full text-center bg-cyan-200 p-3 flex items-center justify-center cursor-pointer hover:bg-slate-600 hover:text-white ">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-5 h-5 mr-2"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z"
                />
              </svg>

              <Link to="/duznici">Dužnici</Link>
            </li>
            <li className="w-full text-center bg-cyan-200 p-3 flex items-center justify-center cursor-pointer hover:bg-slate-600 hover:text-white mt-1 ">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-5 h-5 mr-2"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12"
                />
              </svg>

              <Link to="/nabava">Nabava</Link>
            </li>
            {korisnik && (
              <li
                onClick={handleLogout}
                className="absolute bottom-5 w-full fl"
              >
                <h3 className="text-center text-base ">{korisnik.username}</h3>

                <h1 className="w-full text-center bg-cyan-200 p-3 flex items-center justify-center cursor-pointer hover:bg-slate-600 hover:text-white ">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="w-6 h-6 mr-2"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"
                    />
                  </svg>
                  Odjavi se
                </h1>
              </li>
            )}
          </ul>
        </nav>
      </header>
    </div>
  );
};

export default Navbar;
