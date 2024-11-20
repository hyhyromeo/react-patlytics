import React from "react";
import HistoryModal from "./HistoryModal";
import { useState } from "react";
export default function HistoryBar({ showBar, setshowBar }) {
  const [selectedHistory, setselectedHistory] = useState({});
  const [showHistoryModal, setShowHistoryModal] = useState(false);
  // Gets all the data from the local storage.
  const getAllLocalStorageData = () => {
    const data = {};
    // Loop through all items in the local storage
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      const value = localStorage.getItem(key);
      try {
        // If the value is JSON, parse it
        data[key] = JSON.parse(value);
      } catch (error) {
        // If the value is not JSON, store it as a string
        data[key] = value;
      }
    }
    return data;
  };
  // get all the data from the local storage
  const localStorageData = getAllLocalStorageData();

  return (
    <>
      {/* background modal */}
      <div
        className={`absolute top-0 left-0 w-full h-screen z-10 ${
          showBar ? "block" : "hidden"
        } bg-black bg-opacity-50`}
        onClick={() => setshowBar(!showBar)}
      ></div>
      {/* background modal end*/}
      {showHistoryModal && (
        <HistoryModal
          header={selectedHistory.header}
          body={selectedHistory.body}
          setShowHistoryModal={setShowHistoryModal}
        />
      )}
      {/* History sidebar */}
      <div
        className={`absolute top-0 left-0 ${
          showBar ? "translate-x-0" : "translate-x-50"
        }  z-40 w-80 h-screen p-4 overflow-y-auto transition-transform -translate-x-full bg-white dark:bg-gray-800`}
      >
        <h5 className="text-base font-semibold text-gray-500 uppercase dark:text-gray-400">
          History Analysis
        </h5>
        {/* history reports list */}
        {Object.keys(localStorageData).map((key) => (
          <div
            className="flex items-center p-2 text-base font-semibold text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer z-20"
            key={key}
            onClick={() => {
              setselectedHistory({
                header: key,
                body: localStorageData[key],
              });
              setShowHistoryModal(true);
            }}
          >
            <span className="whitespace-nowrap text-wrap text-sm w-full flex justify-between items-center z-40">
              {key}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={0.8}
                stroke="currentColor"
                className="size-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
                />
              </svg>
            </span>
          </div>
        ))}
        {/* history reports list end*/}

        <button
          onClick={() => setshowBar(!showBar)}
          type="button"
          className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 absolute top-2.5 end-2.5 inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
        >
          <svg
            aria-hidden="true"
            className="w-5 h-5"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clipRule="evenodd"
            ></path>
          </svg>
          <span className="sr-only">Close menu</span>
        </button>
      </div>
      {/* History sidebar end*/}
    </>
  );
}
