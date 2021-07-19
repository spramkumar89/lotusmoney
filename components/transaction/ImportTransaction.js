import moment from "moment";
import XLSX from "xlsx";
import { useState, useEffect } from "react";
import FormData from "form-data";

function ImportTransaction({ userconfig, setuserconfig, showmenu }) {
  const [selectedfile, setselectedfile] = useState("");

  function onChangeHandler(event) {
    setselectedfile(event.target.files[0]);
    console.log("OnChangeHandler : " + event.target.files);
  }

  function onClickHandler(event) {
    event.preventDefault();
    console.log(`Inside the call upload method`);
    let formData = new FormData();
    formData.append("csv", selectedfile);
    console.log("OnClickHandler : Data : " + formData);
    const options = {
      method: "POST",
      body: formData,
    };

    console.log(`FormData : ${formData}`);
    const response = fetch(`/api/transaction/import`, options)
      .then((res) => {
        console.log(`Response from fetch API : ${JSON.stringify(res)}`);
        if (res.ok) {
          console.log(`res ok ${res}`);
        } else {
          console.log(`res ok else ${res}`);
        }
      })
      .catch((error) => {
        console.log(`Response ${JSON.stringify(error)}`);
      });
    console.log(`Response received after upload : ${JSON.stringify(response)}`);
  }

  return (
    <form
      className={
        "mt-3 " + (showmenu == "ImportTransaction" ? "block" : "hidden")
      }
    >
      <div className="grid grid-flow-col gap-2 mb-2 mt-2 items-center justify-center bg-grey-lighter">
        <label className="w-64 flex flex-row items-center justify-center justify-items-center px-2 py-2 bg-blue-100 text-gray-900 rounded-lg shadow-lg tracking-wide uppercase border border-blue cursor-pointer hover:bg-blue-200 hover:text-gray-800 select-none">
          <svg
            className="w-8 h-8"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <path d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z" />
          </svg>
          <span className="pl-4 text-base leading-normal">Select a file</span>
          <input
            type="file"
            name="files"
            className="hidden"
            onChange={onChangeHandler}
          />
        </label>
        <button
          type="submit"
          className="block w-full text-white font-mono font-normal rounded-lg text-lg
          px-4 py-2 bg-indigo-500 hover:bg-indigo-400 focus:bg-indigo-400"
          onClick={onClickHandler}
        >
          Import
        </button>
      </div>
    </form>
  );
}

export default ImportTransaction;
