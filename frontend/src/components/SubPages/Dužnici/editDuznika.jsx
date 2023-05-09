import React, { useEffect, useState } from "react";
import DodajDugModal from "./DodajDugModal";
import axios from "axios";
import Loader from "../../../assets/svg-loaders/three-dots.svg";
import PovijestPosudbe from "./povijestPosudbe";
import { useSelector } from "react-redux";

const editDuznika = ({
  setEditDuznika,
  trigger,
  setTrigger,
  duznik,
  setDuznik,
}) => {
  const [dodajDug, setDodajDug] = useState(false);
  const [dugDuznika, setDugDuznika] = useState(null);
  const [isFetching, setIsFetching] = useState(false);
  const [idProizvoda, setIdProizvoda] = useState(null);
  const [id2Proizvoda, setId2Proizvoda] = useState(null);
  const [index, setIndex] = useState(null);
  const [povijestPosudbe, setPovijestPosudbe] = useState(false);
  const [stateButton, setStateButton] = useState(null);
  const [ukupnoDugovanje, setUkupnoDugovanje] = useState(0);
  const [date, setDate] = useState(new Date());

  const korisnik = useSelector((state) => state.korisnik.value);

  const formatiraniDate = date.toLocaleDateString("en-US", {
    month: "2-digit",
    day: "2-digit",
    year: "numeric",
  });

  useEffect(() => {
    setIsFetching(true);
    axios
      .post("/api/kiosk/dug-duznika", { id: duznik._id })
      .then(({ data }) => {
        setDugDuznika(data);
        setIsFetching(false);
      });
  }, [trigger]);

  useEffect(() => {
    if (dugDuznika) {
      let total = 0;
      const da = dugDuznika.map((item) => {
        return {
          cijena: item.cijena,
          put: item.povijestPosudbe.length,
        };
      });
      console.log(da);
      da.forEach((item) => {
        return (total += item.cijena * item.put);
      });
      setUkupnoDugovanje(total);

      axios.post("/api/kiosk/set-total", { total, id: duznik._id });
    }
  }, [dugDuznika]);

  useEffect(() => {
    if (idProizvoda) {
      axios
        .post("/api/kiosk/brisanje-duga", { idProizvoda, id: duznik._id })
        .then(() => setTrigger(!trigger));
    }
  }, [idProizvoda]);

  useEffect(() => {
    if (stateButton) {
      dodajOduzmi();
    }
  }, [stateButton]);

  function dodajOduzmi() {
    if (id2Proizvoda) {
      if (stateButton === "+") {
        axios
          .post("/api/kiosk/dodaj-jedan", {
            idProizvoda: id2Proizvoda,
            formatiraniDate,
            radnik: korisnik.username,
          })
          .then(() => {
            setTrigger(!trigger);
            setStateButton(null);
          });
      } else {
        axios
          .post("/api/kiosk/oduzmi-jedan", {
            idProizvoda: id2Proizvoda,
          })
          .then(() => {
            setTrigger(!trigger);
            setStateButton(null);
          });
      }
    }
  }

  function obrisiDuznika() {
    let array = [...duznik.popisProizvoda];
    let map = array.map((item) => item._id);

    axios
      .post("/api/kiosk/obrisi-duznika", {
        id: duznik._id,
        array: [...map],
      })
      .then(() => {
        setEditDuznika(false);
        setTrigger(!trigger);
      });
  }

  function crnaLista() {
    axios.post("/api/kiosk/crna-lista", { id: duznik._id }).then(({ data }) => {
      setTrigger(!trigger);
      setDuznik(data);
    });
  }
  console.log(duznik);
  return (
    <div className="w-full h-full bg-white absolute top-0 left-0 flex">
      {" "}
      <button
        className="absolute top-2 right-2 z-50"
        onClick={() => {
          setEditDuznika(false);
          setDuznik(null);
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          class="w-12 h-12 text-slate-600 hover:text-red-500 transition-all "
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
              className="bg-white rounded-md h-full w-full hover:bg-slate-600 hover:text-white transition-all"
              onClick={() => crnaLista()}
            >
              Crna lista
            </button>
          </li>
          <li className="  w-[95%] h-[7%] mb-2">
            <button
              className="bg-white rounded-md h-full w-full hover:bg-slate-600 hover:text-white transition-all"
              onClick={() => setDodajDug(true)}
            >
              Dodaj dug
            </button>
          </li>
          <li className="mb-1 w-[95%] h-[7%]">
            <button
              className="bg-slate-600 text-white rounded-md h-full w-full hover:bg-red-500 hover:text-white transition-all "
              onClick={obrisiDuznika}
            >
              Obriši dužnika
            </button>
          </li>
        </ul>
      </nav>
      <section
        className={
          dodajDug
            ? "w-[90%] h-full relative "
            : povijestPosudbe
            ? "w-[90%] h-full relative "
            : "w-[90%] h-[90%] relative overflow-scroll scrollbar-hide"
        }
      >
        {duznik.blacklist && (
          <div className="h-full w-full bg-red-500 bg-opacity-50 absolute top-0 left-0 z-30"></div>
        )}
        {povijestPosudbe && (
          <PovijestPosudbe
            index={index}
            dugDuznika={dugDuznika}
            setPovijestPosudbe={setPovijestPosudbe}
          />
        )}
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
            dodajDug={dodajDug}
          />
        )}
        {dugDuznika &&
          dugDuznika.map((duznik, index) => {
            return (
              <article
                onClick={() => {
                  setIndex(index);
                  setPovijestPosudbe(true);
                }}
                className={
                  index === 0
                    ? "h-[20%] w-full bg-gray-100 rounded-md   flex relative cursor-pointer  "
                    : "h-[20%] w-full bg-gray-100 rounded-md mt-2 flex relative cursor-pointer  "
                }
              >
                <button
                  className="absolute right-2 bottom-4 z-20"
                  onClick={(e) => {
                    e.stopPropagation();
                    setIdProizvoda(duznik._id);
                  }}
                >
                  {" "}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    class="w-6 h-6 cursor-pointer text-gray-300 hover:text-black transition-all"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M16.5 4.478v.227a48.816 48.816 0 013.878.512.75.75 0 11-.256 1.478l-.209-.035-1.005 13.07a3 3 0 01-2.991 2.77H8.084a3 3 0 01-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 01-.256-1.478A48.567 48.567 0 017.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 013.369 0c1.603.051 2.815 1.387 2.815 2.951zm-6.136-1.452a51.196 51.196 0 013.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 00-6 0v-.113c0-.794.609-1.428 1.364-1.452zm-.355 5.945a.75.75 0 10-1.5.058l.347 9a.75.75 0 101.499-.058l-.346-9zm5.48.058a.75.75 0 10-1.498-.058l-.347 9a.75.75 0 001.5.058l.345-9z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </button>
                <div className="h-full w-[50%] p-4 flex items-center justify-start text-4xl border-r-2 border-gray-300 border-opacity-30 relative">
                  <h2 className="absolute top-2 left-2 text-sm text-gray-300">
                    Naziv proizvoda:
                  </h2>
                  <h1>{duznik.ime}</h1>
                </div>
                <div className="h-full w-[20%] p-4 flex items-center justify-start text-4xl border-r-2 border-gray-300 border-opacity-30 relative">
                  <h2 className="absolute top-2 left-2 text-sm text-gray-300">
                    Pousđena količina:
                  </h2>
                  <h1>{duznik.povijestPosudbe.length}</h1>
                  <div className="flex w-full h-[30%] absolute bottom-0 ml-[-16px]">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setId2Proizvoda(duznik._id);
                        setStateButton("+");
                      }}
                      className="w-[50%] h-full bg-white border-r-2 border-b-2 border-t-2 border-gray-300 border-opacity-25  hover:bg-slate-600 hover:text-white "
                    >
                      +
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setId2Proizvoda(duznik._id);
                        setStateButton("-");
                      }}
                      className="w-[50%] h-full bg-white  border-b-2 border-t-2 border-gray-300 border-opacity-25 hover:bg-slate-600 hover:text-white "
                    >
                      -
                    </button>
                  </div>
                </div>
                <div className="h-full w-[30%] p-4 flex items-center justify-start text-4xl border-r-2 border-gray-300 border-opacity-30 relative">
                  <h2 className="absolute top-2 left-2 text-sm text-gray-300">
                    Šifra proizvoda:
                  </h2>
                  <h1>{duznik.sifra}</h1>
                </div>
              </article>
            );
          })}
      </section>
      {!povijestPosudbe || !dodajDug ? (
        <div
          className={
            dodajDug
              ? "hidden"
              : " absolute w-[90%] right-0 bottom-0 h-[10%] bg-gray-50 p-4 flex items-center"
          }
        >
          <h1 className="text-3xl">
            Ukupno dugovanje: {""}
            {ukupnoDugovanje}€
          </h1>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default editDuznika;
