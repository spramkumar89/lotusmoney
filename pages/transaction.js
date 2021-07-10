import NavBar from "../components/NavBar";
import Transaction from "../components/transaction/Transaction";
import TypeMenu from "../components/transaction/TypeMenu";
import TransactionTable from "../components/transaction/TransactionTable";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { getSession } from "next-auth/client";

function transaction({ category }) {
  let userConfigs_JSON = {};
  let [userconfig, setuserconfig] = useState(userConfigs_JSON);

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
        <div className="max-w-xl mx-auto py-2 sm:px-6 lg:px-8">
          {/* <Transaction userconfig={userconfig} setuserconfig={setuserconfig} /> */}

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
