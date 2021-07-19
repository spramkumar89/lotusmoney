import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { getSession } from "next-auth/client";
import { cloneDeep } from "lodash";

export default function transactiontable() {
  let transaction_res = {};
  transaction_res.rows = [];
  let [transactions, settransactions] = useState(transaction_res.rows);
  let [nextkey, setnextkey] = useState([]);
  let [previouskey, setpreviouskey] = useState([""]);
  let [flow, setflow] = useState("");
  let [page, setpage] = useState(0); //Used for running the useEffectHook
  //console.log(`PreviousKey Length ${previouskey.length}`);

  useEffect(async () => {
    const session = await getSession();

    let startkey = "";
    if (flow == "NEXT") {
      startkey = nextkey;
    } else if (flow == "PREVIOUS" && previouskey.length > 1) {
      let temp = cloneDeep(previouskey);
      /* console.log(
        `flow - ${flow}, previouskey.length - ${JSON.stringify(
          temp.length
        )} , previouskey - ${JSON.stringify(temp)}`
      ); */
      startkey = temp.pop();
      setpreviouskey((previouskey) => previouskey.slice(0, -1));
    }
    /* console.log(
      `PAGE COUNT ${page} - /api/transaction/loadtransactions?name=${session.user.name.toLowerCase()}&startkey=${startkey}`
    ); */
    // Loading MONTHLY_TRANSACTIONS ******************************************************************
    const transaction_res = await fetch(
      `/api/transaction/loadtransactions?name=${session.user.name.toLowerCase()}&startkey=${startkey}`,
      {
        method: "GET",
      }
    );
    if (!transaction_res.ok) {
      console.log(`An error has occured: ${transaction_res}`);
      transaction_res.rows = "NO_USER_RECORD";
    }
    let transaction_res_JSON = await transaction_res.json();
    /* console.log(
      `FRONTEND transaction response ${JSON.stringify(transaction_res_JSON)}`
    ); */
    settransactions(transaction_res_JSON.rows);
    if (
      transaction_res_JSON.previouskey &&
      transaction_res_JSON.previouskey !== "" &&
      transaction_res_JSON.nextkey !== "" &&
      flow != "PREVIOUS"
    ) {
      setpreviouskey(
        [...previouskey, transaction_res_JSON.previouskey].map(String)
      );
    }
    setnextkey(transaction_res_JSON.nextkey);
    setflow("");
    /* console.log(
      `Transaction table - previouskey : ${JSON.stringify(
        previouskey
      )} - nextkey : ${nextkey}`
    ); */
  }, [page]);

  return (
    <div className="flex flex-col">
      <div className="flex flex-row justify-end p-2">
        <div
          className={`font-mono text-sm uppercase px-2 bg-indigo-300 border-blue-800 border-r-2`}
          onClick={() => {
            console.log("Previous button clicked");
            setflow("PREVIOUS");
            setpage(page + 1);
          }}
        >
          Previous
        </div>
        <div
          className={`font-mono text-sm uppercase px-2 bg-indigo-300 ${
            nextkey === "" ? "hidden" : "block"
          }`}
          onClick={() => {
            console.log("Next button clicked");
            setflow("NEXT");
            setpage(page + 1);
          }}
        >
          Next
        </div>
      </div>
      <div className="bg-gray-200 rounded-lg shadow-lg p-2">
        <table className="table-auto w-full">
          {/* <thead>
      <tr className="border-b-2 border-gray-300">
        <th>Title</th>
        <th>Author</th>
        <th>Views</th>
      </tr>
    </thead> */}
          <tbody>
            {transactions.map((trans, key) => (
              <tr className="border-b-2 border-gray-200 px-3" key={key}>
                <td>{trans.value.date}</td>
                <td>{trans.value.description}</td>
                <td>{trans.value.amount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
