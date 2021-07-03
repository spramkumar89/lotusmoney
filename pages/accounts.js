/* This example requires Tailwind CSS v2.0+ */
import NavBar from "../components/NavBar";
import AddAccounts from "../components/accounts/AddAccounts";
import Accounts from "../components/accounts/Accounts";
import AddCards from "../components/accounts/AddCards";
import Cards from "../components/accounts/Cards";

export default function home({ accounts, cards }) {
  return (
    <div className="bg-gray-50">
      <NavBar />
      {/*
      <header classNameName="bg-gray-700 text-yellow-500 shadow">
        <div classNameName="max-w-7xl mx-auto p-4 sm:px-6 lg:px-8">
          <h3 classNameName="text-xl font-bold">LOTUS MONEY</h3>
        </div>
      </header>
      */}
      <main className="bg-gray-50">
        <div className="max-w-md mx-auto py-2 sm:px-6 lg:px-8">
          {/* Replace with your content */}
          <div className="flex flex-col text-gray-600">
            <AddAccounts />
            <div className="flex flex-row justify-between bg-blue-300 p-2 rounded-md items-center m-2">
              <div className="pl-2">ACCOUNTS</div>
            </div>
            <Accounts userAccounts={accounts} />
          </div>
          <div className="flex flex-col text-gray-600 mt-4">
            <AddCards />
            <div className="flex flex-row justify-between bg-blue-300 p-2 rounded-md items-center m-2">
              <div className="pl-2">CARDS</div>
            </div>
            <Cards userCards={cards} />
          </div>
          {/* /End replace */}
        </div>
      </main>
    </div>
  );
}

export async function getServerSideProps() {
  let userRes = await fetch(`${process.env.DBURL}/test/test`);
  if (!userRes.ok) {
    const message = `An error has occured: ${top_trans_res.status}`;
    userRes.rows = "NO_USER_RECORD";
  }
  let userResJSON = await userRes.json();
  let userAccounts = userResJSON.accounts;
  let userCards = userResJSON.cards;

  return {
    props: {
      accounts: userAccounts,
      cards: userCards,
    },
  };
}
