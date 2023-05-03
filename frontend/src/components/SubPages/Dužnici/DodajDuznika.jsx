import React from "react";

const DodajDuznika = ({ setDodajDuznika }) => {
  return (
    <main className="h-full w-full justify-center flex items-center bg-black bg-opacity-20">
      <article className="h-[80%] w-[80%] relative bg-white flex justify-center items-center">
        <button
          className="absolute top-2 left-2"
          onClick={() => setDodajDuznika(false)}
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
        <form className="h-full w-full fl">
          <fieldset className="fl w-full h-full relative">
            <label>
              <input placeholder="Ime" className="bg-gray-50 text-center" />
            </label>
            <label>
              <input placeholder="Prezime" className="bg-gray-50 text-center" />
            </label>
            <button className="absolute bottom-10 bg-cyan-200 rounded-md text-white w-[30%] h-[10%] text-2xl">
              Dodaj
            </button>
          </fieldset>
        </form>
      </article>
    </main>
  );
};

export default DodajDuznika;
