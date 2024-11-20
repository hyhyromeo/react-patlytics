import { useState } from "react";
import InfringingCheck from "./components/InfringingCheck";
import HistoryBar from "./components/HistoryBar";

export default function App() {
  const [showHistoryBar, setShowHistoryBar] = useState(false);

  return (
    <div className="p-5 items-center w-full h-full justify-center flex flex-col relative">
      <h1 className="text-3xl font-bold underline">
        Patent Infringement Analysis
      </h1>
      <div className="w-full text-center flex justify-end m-1">
        <button
          onClick={() => {
            setShowHistoryBar(true);
          }}
          className="w-36 items-center justify-between rounded-md text-white text-sm bg-blue-700 hover:bg-blue-800 flex p-2"
          type="button"
        >
          History Reports &nbsp;
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
            />
          </svg>
        </button>
      </div>

      <InfringingCheck />
      <HistoryBar setshowBar={setShowHistoryBar} showBar={showHistoryBar} />
    </div>
  );
}
