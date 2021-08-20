import moment from "moment";
import XLSX from "xlsx";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import FormData from "form-data";

function ImportTransaction() {
  const [selectedfile, setselectedfile] = useState("");
  const accounts = useSelector((state) => state.user.accounts);
  const cards = useSelector((state) => state.user.cards);

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
    <form className="mt-3">
      <div className="grid grid-flow-col gap-2 mb-2 mt-2 items-center justify-center bg-grey-lighter">
        <label className="w-128 flex flex-row items-center justify-center justify-items-center px-2 py-2 bg-blue-100 text-gray-900 rounded-lg shadow-lg tracking-wide uppercase border border-blue cursor-pointer hover:bg-blue-200 hover:text-gray-800 select-none">
          <select
            name="account"
            className="form-select block w-full px-4 rounded-lg bg-gray-200 font-mono flex-none"
            defaultValue={"DEFAULT"}
          >
            <option value="DEFAULT" disabled hidden>
              Select the source
            </option>
            <option
              disabled
              className="bg-yellow-500 font-mono text-sm text-gray-700 font-semibold"
            >
              ACCOUNTS
            </option>
            {accounts.map((account, key) => (
              <option className="bg-blue-300 text-gray-700" key={account}>
                {account}
              </option>
            ))}
            <option
              disabled
              className="bg-yellow-500 font-mono text-sm text-gray-700 font-semibold"
            >
              CARDS
            </option>
            {cards.map((card, key) => (
              <option className="bg-blue-300 text-gray-700" key={card}>
                {card}
              </option>
            ))}
          </select>
          <input
            type="file"
            name="files"
            className=""
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
