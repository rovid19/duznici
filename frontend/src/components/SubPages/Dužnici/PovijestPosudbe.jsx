import React from "react";

const PovijestPosudbe = ({ index, dugDuznika, setPovijestPosudbe }) => {
  return (
    <div className="w-full h-full absolute top-0 left-0 bg-white z-30 overflow-scroll">
      <button
        className="absolute top-2 right-2 z-20"
        onClick={() => setPovijestPosudbe(false)}
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
      {dugDuznika[index].povijestPosudbe.map((posudba, index) => {
        return (
          <article
            className={
              index === 0
                ? "w-full h-[18%] bg-gray-50 flex"
                : "w-full h-[18%] mt-2 bg-gray-50 flex"
            }
          >
            <div className="h-full w-[70%] p-4 flex items-center justify-start text-4xl border-r-2 border-gray-300 border-opacity-30 relative">
              <h2 className="absolute top-2 left-2 text-sm text-gray-300">
                Datum posudbe:
              </h2>
              <h1>{posudba.datum}</h1>
            </div>

            <div className="h-full w-[30%] p-4 flex items-center justify-start text-4xl border-r-2 border-gray-300 border-opacity-30 relative">
              <h2 className="absolute top-2 left-2 text-sm text-gray-300">
                Radnik
              </h2>
              <h1>{posudba.radnik}</h1>
            </div>
          </article>
        );
      })}
    </div>
  );
};

export default PovijestPosudbe;
