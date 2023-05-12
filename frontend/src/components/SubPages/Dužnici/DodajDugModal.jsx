import React, { useEffect, useState } from "react";
import axios from "axios";

const DodajDugModal = ({
  setDodajDug,
  trigger,
  setTrigger,
  duznik,
  dodajDug,
}) => {
  const [imeProizvoda, setImeProizvoda] = useState(null);
  const [sifraProizvoda, setSifraProizvoda] = useState(null);
  const [cijenaProizvoda, setCijenaProizvoda] = useState(null);
  const [proizvodi, setProizvodi] = useState(null);
  const [sugestije, setSugestije] = useState(null);
  const [pretrazi, setPretrazi] = useState("");
  const [templ, setTempl] = useState(null);

  function handleDodajDug(e) {
    e.preventDefault();
    axios
      .post("/api/kiosk/dodaj-dug", {
        imeProizvoda,
        sifraProizvoda,
        id: duznik._id,
        cijenaProizvoda,
      })
      .then(() => {
        setTrigger(!trigger);
        setDodajDug(false);
      });
  }

  useEffect(() => {
    axios
      .get("/api/kiosk/svi-proizvodi")
      .then(({ data }) => setProizvodi(data));
  }, []);

  function handleSuggestions(text) {
    let prevVal = pretrazi;
    let currentVal = text;

    if (currentVal.length < prevVal.length) {
      setSugestije(null);
    }

    setPretrazi(currentVal);
  }

  useEffect(() => {
    if (pretrazi) {
      console.log(pretrazi);
      let array = [...proizvodi];

      array = array.filter((product) => {
        const regex = new RegExp(`${pretrazi}`, "gi");
        console.log(product.ime);
        return product.ime && product.ime.match(regex);
      });
      setSugestije(array);
    }
  }, [pretrazi]);

  useEffect(() => {
    if (templ) {
      setImeProizvoda(templ.ime);
      setSifraProizvoda(templ.sifra);
      setCijenaProizvoda(templ.cijena);
    }
  }, [templ]);
  console.log(sugestije);
  return (
    <article className="h-full w-full  relative flex justify-center items-center z-40">
      {" "}
      <button
        className="absolute top-2 right-2 z-20"
        onClick={() => setDodajDug(false)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          class="w-12 h-12"
        >
          <path
            fill-rule="evenodd"
            d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-1.72 6.97a.75.75 0 10-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 101.06 1.06L12 13.06l1.72 1.72a.75.75 0 101.06-1.06L13.06 12l1.72-1.72a.75.75 0 10-1.06-1.06L12 10.94l-1.72-1.72z"
            clip-rule="evenodd"
          />
        </svg>
      </button>
      <form
        className="fl justify-center h-[90%] w-full"
        onSubmit={handleDodajDug}
      >
        <fieldset className="fl h-full w-[80%]">
          <label className="w-full flex h-[10%] justify-center relative">
            <input
              placeholder="Ime proizvoda"
              className="bg-gray-300 w-full h-full rounded-md text-3xl text-center"
              onChange={(e) => {
                setImeProizvoda(e.target.value);
                handleSuggestions(e.target.value);
              }}
              value={templ && templ.ime}
            />
            <div
              className={
                sugestije && sugestije.length > 0
                  ? "absolute bottom-[-400px] h-[400px] w-full z-20 bg-black"
                  : "hidden"
              }
            >
              {sugestije &&
                sugestije.map((product, i) => {
                  return (
                    <div
                      key={i}
                      className={
                        templ
                          ? "hidden "
                          : "bg-white  text-xl  w-full cursor-pointer hover:bg-slate-600 hover:text-white"
                      }
                      onClick={() => {
                        setTempl(product);
                        setSugestije(null);
                      }}
                    >
                      {product.ime}
                    </div>
                  );
                })}
            </div>
          </label>
          <label className="w-full flex h-[10%] mt-1 justify-center">
            <input
              placeholder="Šifra proizvoda"
              className="bg-gray-300 w-full h-full rounded-md text-3xl text-center"
              onChange={(e) => setSifraProizvoda(e.target.value)}
              defaultValue={templ && templ.sifra}
            />
          </label>
          <label className="w-full flex h-[10%] mt-1 justify-center relative">
            <input
              placeholder="Cijena proizvoda"
              type="Number"
              step="0.01"
              className="bg-gray-300 w-full h-full rounded-md text-3xl text-center"
              onChange={(e) => setCijenaProizvoda(e.target.value)}
              defaultValue={templ && templ.cijena}
            />
            <span className="absolute right-6 text-3xl top-2">€</span>
          </label>
        </fieldset>
        <button className="bg-slate-600 text-white p-2 rounded-md h-[8%] w-[35%] hover:bg-red-500 transition-all ">
          Dodaj
        </button>
      </form>
    </article>
  );
};

export default DodajDugModal;
