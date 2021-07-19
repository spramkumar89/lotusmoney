import { useCallback } from "react";
import { getSession } from "next-auth/client";
import moment from "moment";

function transaction({ userconfig, setuserconfig, showmenu }) {
  /* console.log(
    `**************${JSON.stringify(userconfig)} , categories : ${
      userconfig.categories
    } , showmenu : ${showmenu}`
  ); */

  const handleSubmit = useCallback(async (event) => {
    event.preventDefault();
    const session = await getSession();
    fetch("/api/user/transaction", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userdb: session.user.name.toLowerCase(),
        date: event.target.date.value,
        account: event.target.account.value,
        description: event.target.description.value,
        amount: event.target.amount.value,
        category: event.target.category.value,
      }),
    })
      .then((res) => {
        //console.log(`Front end authentication response ${JSON.stringify(res)}`);
        if (res.ok) {
          //console.log(`res ok ${res}`);
        } else {
          console.log(`res ok else ${res}`);
        }
      })
      .catch((error) => {
        console.log(
          `Front end authentication error response ${JSON.stringify(error)}`
        );
      });
  }, []);

  return (
    <form
      className={"mt-3 " + (showmenu == "AddTransaction" ? "block" : "hidden")}
      onSubmit={handleSubmit}
    >
      <div className="grid grid-flow-col gap-2 mb-2 mt-2">
        <input
          type="date"
          name="date"
          id="date"
          placeholder="Transaction Date"
          defaultValue={moment().format("yyyy-MM-DD")}
          className="w-full px-4 py-2 rounded-lg bg-gray-200 border focus:border-blue-500 focus:bg-white focus:outline-none"
          autoFocus
          autoComplete="true"
          required
        />
        <select
          name="account"
          className="form-select block w-full px-4 rounded-lg bg-gray-200 font-mono"
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
          {userconfig.accounts.map((account, key) => (
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
          {userconfig.cards.map((card, key) => (
            <option className="bg-blue-300 text-gray-700" key={card}>
              {card}
            </option>
          ))}
        </select>
        <input
          type="text"
          className="form-input w-full px-4 py-2 rounded-lg bg-gray-200 border focus:border-blue-500 focus:bg-white focus:outline-none"
          id="amount"
          name="amount"
          placeholder="Amount"
          autoFocus
          autoComplete="true"
          required
        />
      </div>
      <div>
        <textarea
          name="description"
          className="form-textarea w-full px-4 py-2 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
          rows="1"
          placeholder="Transaction Description"
          required
        ></textarea>
      </div>
      <div className="grid grid-flow-col gap-10 mb-2 mt-2">
        <select
          name="category"
          className="form-select block w-full px-4 rounded-lg bg-gray-200 font-mono"
          defaultValue={"DEFAULT"}
        >
          <option value="DEFAULT" disabled hidden>
            Select the category
          </option>
          <option
            disabled
            className="bg-yellow-500 font-mono text-sm text-gray-700 font-semibold"
          >
            INCOME CATEGORIES
          </option>
          {userconfig.incomeCategories.map((income, key) => (
            <option
              className="bg-blue-300 text-gray-700 font-mono text-md"
              key={income}
            >
              {income}
            </option>
          ))}
          <option
            disabled
            className="bg-yellow-500 font-mono text-sm text-gray-700 font-semibold"
          >
            EXPENSE CATEGORIES
          </option>
          {userconfig.expenseCategories.map((expense, key) => (
            <option
              className="bg-blue-300 text-gray-700 font-mono text-md"
              key={expense}
            >
              {expense}
            </option>
          ))}
        </select>
        <button
          type="submit"
          className="block w-full text-white font-mono font-semibold rounded-lg text-lg
          px-4 py-2 bg-indigo-500 hover:bg-indigo-400 focus:bg-indigo-400 "
        >
          Add Transaction
        </button>
      </div>
    </form>
  );
}

export default transaction;
