import NavBar from "../components/NavBar";
import AddTransaction from "../components/transaction/AddTransaction";
import ImportTransaction from "../components/transaction/ImportTransaction";
import TypeMenu from "../components/transaction/TypeMenu";
import TransactionTable from "../components/transaction/TransactionTable";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { getSession } from "next-auth/client";

function transaction({ category }) {
  let userConfigs_JSON = {};
  userConfigs_JSON["incomeCategories"] = [];
  userConfigs_JSON["expenseCategories"] = [];
  userConfigs_JSON["accounts"] = [];
  userConfigs_JSON["cards"] = [];
  let [userconfig, setuserconfig] = useState(userConfigs_JSON);
  let [showmenu, setshowmenu] = useState("");

  useEffect(async () => {
    const session = await getSession();
    //console.log(`Home page session values ${JSON.stringify(session)}`);

    // Loading USER_SETTINGS
    const userConfigs = await fetch(
      "/api/settings/load?" +
        new URLSearchParams({
          name: session.user.name.toLowerCase(),
        }),
      {
        method: "GET",
      }
    );
    if (!userConfigs.ok) {
      console.log(`User config API error has occured: ${userConfigs}`);
    }
    userConfigs_JSON = await userConfigs.json();
    /* console.log(
      `Transaction Page - /api/settings/load - response : ${JSON.stringify(
        userConfigs_JSON
      )}`
    ); */
    setuserconfig(userConfigs_JSON);
  }, []);

  return (
    <div>
      <NavBar />

      <main className="bg-gray-50">
        <div className="max-w-4xl mx-auto py-2 sm:px-6 lg:px-8">
          <div className="flex flex-row w-full justify-end">
            <div
              className="font-mono text-lg m-2 px-2 bg-yellow-500 rounded-md shadow-md text-gray-900"
              onClick={() => {
                setshowmenu((prevState) =>
                  prevState == "AddTransaction" ? "" : "AddTransaction"
                );
              }}
            >
              AddTransaction
            </div>
            <div
              className="font-mono text-lg m-2 px-2 bg-yellow-500 rounded-md shadow-md text-gray-900"
              onClick={(prev) => {
                setshowmenu((prevState) =>
                  prevState == "ImportTransaction" ? "" : "ImportTransaction"
                );
              }}
            >
              ImportTransaction
            </div>
            <div
              className="font-mono text-lg m-2 px-2 bg-yellow-500 rounded-md shadow-md text-gray-900"
              onClick={(prev) => {
                setshowmenu("FilterTransaction");
              }}
            >
              FilterTransaction
            </div>
          </div>

          <AddTransaction
            userconfig={userconfig}
            setuserconfig={setuserconfig}
            showmenu={showmenu}
          />

          <ImportTransaction
            userconfig={userconfig}
            setuserconfig={setuserconfig}
            showmenu={showmenu}
          />

          <div className="border border-b-2 mt-2 mb-2 border-yellow-500"></div>
          {/* <TypeMenu /> */}
          <TransactionTable />
        </div>
      </main>
    </div>
  );
}

/* export async function getServerSideProps() {
  //let categories = await loadCategoryValues();
  let categories = ["Uncategorized"];
  //console.log(`categoryWise response row ${JSON.stringify(categoryWise)}`);

  return {
    props: {
      category: categories,
    },
  };
} */

/* async function loadCategoryValues() {
  let userRes = await fetch(
    `${process.env.DBURL}/${session.user.name.toLowerCase()}/userconfig`,
    {
      headers: new Headers({
        Authorization: `Basic ${base64.encode(
          `${process.env.DBUSERNAME}:${process.env.DBPASSWORD}`
        )}`,
      }),
    }
  );
  if (!userRes.ok) {
    const message = `An error has occured: ${top_trans_res.status}`;
    userRes.rows = "NO_USER_RECORD";
  }
  let userResJSON = await userRes.json();
  //console.log(`userResJSON : ${JSON.stringify(userResJSON)}`);
  let categories = userResJSON.categories;
  //console.log(`categories : ${Categories}`);
  return categories;
} */

export default transaction;
