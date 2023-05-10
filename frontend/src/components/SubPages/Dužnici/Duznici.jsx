import React, { useEffect } from "react";
import DodajDuznika from "./DodajDuznika";
import { useState, useRef } from "react";
import axios from "axios";
import EditDuznika from "./editDuznika.jsx";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
const Duznici = () => {
  const [dodajDuznika, setDodajDuznika] = useState(false);
  const [editDuznika, setEditDuznika] = useState(false);
  const [duznik, setDuznik] = useState(null);
  const [popisDuznika, setPopisDuznika] = useState(null);
  const [popisDuznika2, setPopisDuznika2] = useState(null);
  const [skrati, setSkrati] = useState(null);
  const [savDug, setSavDug] = useState(null);
  const [trigger, setTrigger] = useState(false);
  const [pretrazi, setPretrazi] = useState("");
  const div = useRef();

  const korisnik = useSelector((state) => state.korisnik.value);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("/api/kiosk/popis-duznika")
      .then(({ data }) => {
        setPopisDuznika(data);
        setPopisDuznika2(data);

        const container = document.querySelectorAll(".sekcija");
        div.current = container;
      })
      .then(() => totalCounter());
  }, [trigger]);
  // pretrazi funkcija
  useEffect(() => {
    if (pretrazi) {
      console.log(pretrazi);
      let newArray = [...popisDuznika];
      newArray = newArray.filter((item) => {
        return item.ime.includes(pretrazi);
      });
      setPopisDuznika(newArray);
    } else {
      setTrigger(!trigger);
    }
  }, [pretrazi]);

  useEffect(() => {
    if (duznik) {
      setEditDuznika(true);
    }
  }, [duznik]);

  // kad upises karakter u input ovo je funkcija s kojom se gleda ak je user dodal karakter ili je oduzel
  function handleChange(e) {
    let prevVal = pretrazi;
    let currentVal = e.target.value;

    if (currentVal.length < prevVal.length) {
      setPopisDuznika(popisDuznika2);
    }

    setPretrazi(currentVal);
  }
  useEffect(() => {
    if (!korisnik) {
      alert("Prvo se moraš prijaviti");
      navigate("/");
    }
  }, [korisnik]);

  useEffect(() => {
    if (popisDuznika) {
      let total = 0;

      popisDuznika.forEach((item) => (total += item.totalDug));
      console.log(total);

      setSavDug(total);
    }
  }, [trigger, popisDuznika]);

  console.log(popisDuznika);

  return (
    <main className="h-full w-full ">
      <header className="h-[8%] bg-cyan-200 p-2 flex">
        <form className="h-full w-[80%]   ">
          <fieldset className="h-full w-full">
            <label className="h-full w-full relative">
              <input
                className="h-full w-full p-2 text-3xl rounded-md"
                onChange={(e) => handleChange(e)}
              />
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
        <nav className="h-full w-[40%] flex ">
          <ul className="w-full h-full flex">
            <li className="w-[50%] h-full flex justify-left ml-2 items-center bg-white rounded-md p-4">
              <h1 className="text-xl">
                Ukupno: {savDug && savDug.toFixed(2)}€
              </h1>
            </li>
            <li className="w-[50%] flex justify-end ">
              <button
                onClick={() => {
                  setDodajDuznika(true);
                  div.current[0].scrollTop = 0;
                }}
                className="h-full w-[70%] bg-white rounded-md text-base hover:bg-slate-600 hover:text-white transition-all"
              >
                Dodaj dužnika
              </button>
            </li>
          </ul>
        </nav>
      </header>

      <section
        className={
          editDuznika || dodajDuznika
            ? "w-full h-[92%] overflow-hidden relative sekcija scrollbar-hide"
            : "w-full h-[92%] overflow-scroll relative sekcija scrollbar-hide"
        }
      >
        {editDuznika && (
          <EditDuznika
            setEditDuznika={setEditDuznika}
            trigger={trigger}
            setTrigger={setTrigger}
            duznik={duznik}
            setDuznik={setDuznik}
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
                  index === 0 && duznik.blacklist
                    ? "h-[20%] w-full bg-red-500 bg-opacity-50 cursor-pointer hover:bg-slate-600 hover:text-white transition-all flex "
                    : duznik.blacklist
                    ? "h-[20%] mt-2 w-full bg-red-500 bg-opacity-50 cursor-pointer hover:bg-slate-600 hover:text-white transition-all  flex"
                    : index === 0
                    ? "h-[20%] w-full bg-gray-50 cursor-pointer hover:bg-slate-600 hover:text-white transition-all  flex"
                    : "h-[20%] mt-2 w-full bg-gray-50 cursor-pointer hover:bg-slate-600 hover:text-white transition-all  flex"
                }
              >
                <div className="h-full w-[22%] text-5xl p-2 flex gap-4 items-center ml-6 border-r-2 border-gray-300 border-opacity-30 ">
                  <h1>{duznik.ime}</h1>
                  <h1>{duznik.prezime}</h1>
                </div>
                <div className="h-full w-[62%] text-3xl p-2  gap-4 items-center ml-6 border-r-2 border-gray-300 border-opacity-30 pt-8">
                  {duznik.popisProizvoda.map((proizvod, index) => {
                    return (
                      <div className="mt-1">
                        {proizvod.ime} x {proizvod.povijestPosudbe.length}{" "}
                      </div>
                    );
                  })}
                </div>
                <div className="h-full w-[16%] text-5xl p-2 flex gap-4 items-center ml-6 border-r-2 border-gray-300 border-opacity-30 ">
                  <h1>{duznik.totalDug && duznik.totalDug.toFixed(2)}€</h1>
                </div>
              </article>
            );
          })}
      </section>
    </main>
  );
};

export default Duznici;
