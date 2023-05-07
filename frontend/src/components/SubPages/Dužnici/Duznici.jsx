import React, { useEffect } from "react";
import DodajDuznika from "./DodajDuznika";
import { useState, useRef } from "react";
import axios from "axios";
import EditDuznika from "./editDuznika.jsx";
const Duznici = () => {
  const [dodajDuznika, setDodajDuznika] = useState(false);
  const [editDuznika, setEditDuznika] = useState(false);
  const [duznik, setDuznik] = useState(null);
  const [popisDuznika, setPopisDuznika] = useState(null);
  const [trigger, setTrigger] = useState(false);
  const div = useRef();

  useEffect(() => {
    axios.get("/api/kiosk/popis-duznika").then(({ data }) => {
      setPopisDuznika(data);
      const container = document.querySelectorAll(".sekcija");
      div.current = container;
    });
  }, [trigger]);

  useEffect(() => {
    if (duznik) {
      setEditDuznika(true);
    }
  }, [duznik]);

  return (
    <main className="h-full w-full ">
      <header className="h-[8%] bg-cyan-200 p-2 flex">
        <form className="h-full w-[80%]   ">
          <fieldset className="h-full w-full">
            <label className="h-full w-full relative">
              <input className="h-full w-full p-2 text-3xl rounded-md" />
              <button className="absolute right-2 bottom-0">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="w-8 h-8 text-black hover:scale-95 transition-all"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                  />
                </svg>
              </button>
            </label>
          </fieldset>
        </form>
        <nav className="h-full w-[40%]  flex justify-end">
          <button
            onClick={() => {
              setDodajDuznika(true);
              div.current[0].scrollTop = 0;
            }}
            className="h-full w-[30%] bg-white rounded-md text-base hover:bg-slate-600 hover:text-white transition-all"
          >
            Dodaj dužnika
          </button>
        </nav>
      </header>

      <section
        className={
          editDuznika || dodajDuznika
            ? "w-full h-[92%] overflow-hidden relative sekcija"
            : "w-full h-[92%] overflow-scroll relative sekcija"
        }
      >
        {editDuznika && (
          <EditDuznika
            setEditDuznika={setEditDuznika}
            trigger={trigger}
            setTrigger={setTrigger}
            duznik={duznik}
          />
        )}
        {dodajDuznika && (
          <DodajDuznika
            setDodajDuznika={setDodajDuznika}
            trigger={trigger}
            setTrigger={setTrigger}
          />
        )}

        {popisDuznika &&
          popisDuznika.map((duznik, index) => {
            return (
              <article
                key={index}
                onClick={() => {
                  setDuznik(duznik);
                  div.current[0].scrollTop = 0;
                }}
                className={
                  index === 0
                    ? "h-[20%] w-full bg-gray-50 cursor-pointer hover:bg-slate-600 hover:text-white transition-all"
                    : "h-[20%] mt-2 w-full bg-gray-50 cursor-pointer hover:bg-slate-600 hover:text-white transition-all"
                }
              >
                <div className="h-full w-[22%] text-5xl p-2 flex gap-4 items-center ml-6 border-r-2 border-gray-300 border-opacity-30 ">
                  <h1>{duznik.ime}</h1>
                  <h1>{duznik.prezime}</h1>
                </div>
              </article>
            );
          })}
      </section>
    </main>
  );
};

export default Duznici;
