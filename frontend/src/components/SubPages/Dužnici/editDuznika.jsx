import React, { useEffect, useState } from "react";
import DodajDugModal from "./DodajDugModal";
import axios from "axios";
import Loader from "../../../assets/svg-loaders/three-dots.svg";

const editDuznika = ({ setEditDuznika, trigger, setTrigger, duznik }) => {
  const [dodajDug, setDodajDug] = useState(null);
  const [dugDuznika, setDugDuznika] = useState(null);
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    setIsFetching(true);
    axios
      .post("/api/kiosk/dug-duznika", { id: duznik._id })
      .then(({ data }) => {
        setDugDuznika(data);
        setIsFetching(false);
      });
  }, [trigger]);
  console.log(dugDuznika);
  return (
    <div className="w-full h-full bg-white absolute top-0 left-0 flex">
      {" "}
      <button
        className="absolute top-2 right-2 z-20"
        onClick={() => setEditDuznika(false)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          class="w-6 h-6"
        >
          <path
            fill-rule="evenodd"
            d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-1.72 6.97a.75.75 0 10-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 101.06 1.06L12 13.06l1.72 1.72a.75.75 0 101.06-1.06L13.06 12l1.72-1.72a.75.75 0 10-1.06-1.06L12 10.94l-1.72-1.72z"
            clip-rule="evenodd"
          />
        </svg>
      </button>
      <nav className="h-full w-[10%] bg-cyan-200">
        <ul className="fl2 h-full w-full justify-end relative">
          <li className="absolute top-2 left-0 text-center w-full text-slate-600 text-3xl">
            {duznik.ime}
          </li>
          <li className="absolute top-10 left-0 text-center w-full text-slate-600 text-3xl">
            {duznik.prezime}
          </li>
          <li className="  w-[95%] h-[7%] mb-2">
            <button
              className="bg-white rounded-md h-full w-full hover:bg-slate-600 hover:text-white"
              onClick={() => setDodajDug(true)}
            >
              Dodaj dug
            </button>
          </li>
          <li className="mb-1 w-[95%] h-[7%]">
            <button className="bg-slate-600 text-white rounded-md h-full w-full hover:bg-red-500 hover:text-white ">
              Obriši dužnika
            </button>
          </li>
        </ul>
      </nav>
      <section className="w-[90%] h-full relative">
        {isFetching && (
          <div className="h-full w-full absolute top-0 bg-white z-20 flex items-center justify-center">
            <img src={Loader}></img>
          </div>
        )}
        {dodajDug && (
          <DodajDugModal
            setDodajDug={setDodajDug}
            trigger={trigger}
            setTrigger={setTrigger}
            duznik={duznik}
          />
        )}
        {dugDuznika &&
          dugDuznika.map((duznik, index) => {
            return (
              <article
                className={
                  index === 0
                    ? "h-[15%] w-full bg-gray-100 rounded-md   flex"
                    : "h-[15%] w-full bg-gray-100 rounded-md mt-2 flex"
                }
              >
                <div className="h-full w-[30%] p-4 flex items-center justify-start text-4xl border-r-2 border-gray-300 border-opacity-30">
                  <h1>{duznik.ime}</h1>
                </div>
                <div className="h-full w-[10%] p-4 flex items-center justify-start text-4xl border-r-2 border-gray-300 border-opacity-30"></div>
              </article>
            );
          })}
      </section>
    </div>
  );
};

export default editDuznika;
