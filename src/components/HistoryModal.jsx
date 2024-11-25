import React from "react";

export default function HistoryModal({ header, body, setShowHistoryModal }) {
  return (
    <div
      className={`
      absolute left-auto top-0 text-white overflow-auto text-wrap text-xs w-11/12 h-full bg-slate-700 z-50 p-12 m-6`}
    >
      {/* close button */}
      <button
        onClick={() => setShowHistoryModal(false)}
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
        <span className="sr-only">Close</span>
      </button>
      {/* end close button */}

      {/* content */}
      <h1 className="text-2xl font-bold">{header}</h1>
      <pre className="text-wrap">{body}</pre>
      {/* end content */}
    </div>
  );
}
