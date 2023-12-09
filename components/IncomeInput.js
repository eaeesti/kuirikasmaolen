import { useState } from "react";
import { equivalizeIncome } from "../utils/calculator";
import { preventingDefault } from "../utils/utils";
import { ArrowTopRightOnSquareIcon } from "@heroicons/react/20/solid";

export default function IncomeInput({ submitIncome }) {
  let [income, setIncome] = useState("");
  let [adults, setAdults] = useState(1);
  let [children, setChildren] = useState(0);
  let [changingHousehold, setChangingHousehold] = useState(false);

  function onIncomeInputKeypress(event) {
    const incomeInput = document.getElementById("incomeInput");

    let newIncome = incomeInput.value.replace(",", ".");

    // Must start with digit other than 0 and continue with any digit
    // Can have a . with 0 to 2 digits at the end
    // If it doesn't match, undo the input
    if (/(^[1-9]\d{0,7}$)|(^[1-9]\d{0,7}\.\d{0,2}$)|^$/.test(newIncome)) {
      setIncome(newIncome);
    }
  }

  function submit() {
    const equivalizedIncome = equivalizeIncome(income, adults, children);
    submitIncome(equivalizedIncome);
  }

  return (
    <form
      onSubmit={preventingDefault(submit)}
      className="space-y-4 w-full max-w-xs md:max-w-md"
    >
      <div>
        <label htmlFor="incomeInput" className="block mb-1 text-sm">
          {changingHousehold
            ? "Leibkonna igakuine netosissetulek:"
            : "Igakuine netosissetulek:"}
        </label>
        <div className="relative text-xl">
          <input
            id="incomeInput"
            type="text"
            inputMode="numeric"
            className="block py-4 pr-10 pl-5 w-full rounded-md border-0 ring-1 ring-inset ring-slate-300 focus:ring-primary-600 text-slate-900 placeholder:text-slate-400 focus:ring-[3px] focus:ring-inset focus-within:outline-none"
            value={income}
            onInput={onIncomeInputKeypress}
          />
          <div className="flex absolute top-0 right-4 justify-center items-center h-full pointer-events-none select-none text-slate-400">
            €
          </div>
        </div>
      </div>
      {changingHousehold ? (
        <div className="flex flex-col space-y-4">
          <div className="flex flex-row space-x-4">
            <div className="flex flex-col w-full">
              <label htmlFor="adultsInput" className="block mb-1 text-sm">
                Täiskasvanuid:
              </label>
              <input
                id="adultsInput"
                type="number"
                className="block py-4 px-5 w-full rounded-md border-0 ring-1 ring-inset ring-slate-300 focus:ring-primary-600 text-slate-900 placeholder:text-slate-400 focus:ring-[3px] focus:ring-inset focus-within:outline-none text-xl"
                min={1}
                max={10}
                value={adults}
                onInput={(event) => setAdults(event.target.value)}
              />
            </div>
            <div className="flex flex-col w-full">
              <label htmlFor="childrenInput" className="block mb-1 text-sm">
                Lapsi:
              </label>
              <input
                id="childrenInput"
                type="number"
                className="block py-4 px-5 w-full rounded-md border-0 ring-1 ring-inset ring-slate-300 focus:ring-primary-600 text-slate-900 placeholder:text-slate-400 focus:ring-[3px] focus:ring-inset focus-within:outline-none text-xl"
                min={0}
                max={100}
                value={children}
                onInput={(event) => setChildren(event.target.value)}
              />
            </div>
          </div>
          <div className="text-sm">
            Kasutame{" "}
            <a
              href="https://en.wikipedia.org/wiki/Equivalisation"
              className="font-semibold text-primary-700 hover:opacity-70"
              target="_blank"
              rel="noopener noreferrer"
            >
              OECD ekvivaliseerimist
              <ArrowTopRightOnSquareIcon className="inline mb-1 ml-1 w-4 h-4" />
            </a>
            .
          </div>
        </div>
      ) : (
        <div className="flex flex-row space-x-1 text-sm">
          <div>Leibkonnakoosseis: 1 täiskasvanu</div>
          <button
            type="button"
            className="font-bold cursor-pointer opacity text-primary-700 hover:opacity-70"
            onClick={() => setChangingHousehold(true)}
          >
            Muuda
          </button>
        </div>
      )}
      <div>
        <button
          type="submit"
          className="block gap-1.5 justify-center items-center px-4 py-3 mt-4 w-full font-semibold tracking-tight text-center text-white rounded-md shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 disabled:opacity-50 disabled:cursor-not-allowed bg-primary-700 hover:bg-primary-600 focus-visible:outline-primary-700 disabled:hover:bg-primary-600"
        >
          Arvuta!
        </button>
      </div>
      <p className="text-sm text-center">
        Me ei salvesta sinu sisestatud andmeid.
      </p>
    </form>
  );
}
