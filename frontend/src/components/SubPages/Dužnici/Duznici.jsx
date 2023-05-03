import React from "react";
import DodajDuznika from "./DodajDuznika";
import { useState } from "react";
const Duznici = () => {
  const [dodajDuznika, setDodajDuznika] = useState(false);
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
            onClick={() => setDodajDuznika(true)}
            className="h-full w-[30%] bg-white rounded-md text-base"
          >
            Dodaj dužnika
          </button>
        </nav>
      </header>

      <section className="w-full h-[92%]">
        {dodajDuznika && <DodajDuznika setDodajDuznika={setDodajDuznika} />}
      </section>
    </main>
  );
};

export default Duznici;
