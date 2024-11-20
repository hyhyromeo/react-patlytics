import React, { useState } from "react";
import axios from "axios";
import Loading from "./Loading";
import companyProductData from "./company_products.json";
import patentsData from "./patents.json";
export default function InfringingCheck() {
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [patentId, setPatentId] = useState("");
  const [company, setCompany] = useState("");

  const sendMessage = async (targetCompany, targetPatents) => {
    setLoading(true);
    const apiUrl =
      "https://patlytics-nodejs-521027025626.asia-east1.run.app/api/infringement/infringementCheck";
    const body = {
      targetCompany: targetCompany,
      targetPatents: targetPatents,
    };
    try {
      const response = await axios.post(apiUrl, body, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      setResponse(response.data);
      // Update loading state
      setLoading(false);
      // Store the JSON object in local storage
      localStorage.setItem(
        `${patentId} vs ${company}`,
        JSON.stringify(response.data)
      );
      return response.data;
    } catch (error) {
      console.error(
        "Error posting data:",
        error.response ? error.response.data : error.message
      );
      throw error;
    }
  };

  function getDataFromCompanyProduct(targetCompany) {
    // Use `find` to locate the company by its name
    const company = companyProductData.companies.find(
      (company) => company.name.toLowerCase() === targetCompany.toLowerCase()
    );
    // Return the matched company data or a message if no match is found
    return company
      ? company
      : `No company found with the name "${targetCompany}"`;
  }
  function getDataFromPatent(targetPatentId) {
    // Use `find` to locate the object with the matching publication number
    const result = patentsData.find(
      (item) => item.publication_number === targetPatentId
    );
    // Return the matched data or a message if no match is found
    return result
      ? result
      : `No data found with publication number "${targetPatentId}"`;
  }

  // Clears the input fields and resets relevant state variables.
  function clearInputs() {
    // Reset the company input field
    setCompany("");
    // Reset the patent ID input field
    setPatentId("");
    // Clear the response state
    setResponse("");
    // Set loading state to false
    setLoading(false);
  }
  function handleSendBtnClick() {
    if (!patentId || !company) {
      alert("Please select Patent ID and Company");
      return;
    }

    sendMessage(
      getDataFromCompanyProduct(company),
      getDataFromPatent(patentId)
    );
  }
  return (
    <div className="flex flex-col items-center w-full h-full">
      {/* Loading component */}
      {loading && <Loading />}
      {/* Loading component end */}

      {/* Clear and new analysis button */}
      {response && (
        <div className="w-full text-center flex justify-end">
          <button
            onClick={clearInputs}
            className="w-36 items-center justify-between rounded-md text-white text-sm bg-green-600 hover:bg-green-800 flex p-2"
            type="button"
          >
            New Analysis &nbsp;
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
                d="M12 4.5v15m7.5-7.5h-15"
              />
            </svg>
          </button>
        </div>
      )}
      {/* Clear and new analysis button end*/}

      {/* Input fields */}
      {!response && (
        <div className="flex flex-col gap-2 mt-5 w-80">
          <label>Patent ID:</label>
          <select
            value={patentId}
            onChange={(e) => setPatentId(e.target.value)}
            className="border border-gray-400 px-2"
          >
            <option value="" disabled>
              Select Patent ID
            </option>
            {patentsData.map((patent) => (
              <option
                key={patent.publication_number}
                value={patent.publication_number}
              >
                {patent.publication_number}
              </option>
            ))}
          </select>
          <label>Company:</label>
          <select
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            className="border border-gray-400 px-2"
          >
            <option value="" disabled>
              Select Company
            </option>
            {companyProductData.companies.map((company) => (
              <option key={company.name} value={company.name}>
                {company.name}
              </option>
            ))}
          </select>
          <span className="w-full flex justify-end">
            <button
              className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded my-4 w-fit mr-4"
              onClick={clearInputs}
            >
              clear
            </button>
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded my-4 w-fit"
              onClick={handleSendBtnClick}
            >
              Send
            </button>
          </span>
        </div>
      )}
      {/* Input fields end */}

      {/* Display the response */}
      <div className="relative min-w-32 min-h-96 my-5 ">
        {response && (
          <>
            <h1 className="text-2xl font-bold underline">
              {company} vs {patentId}
            </h1>
            <pre className=" w-full  whitespace-pre-wrap bg-gray-800 text-orange-500 p-7 rounded-md">
              {response}
            </pre>
          </>
        )}
      </div>
      {/* Display the response end */}
    </div>
  );
}
