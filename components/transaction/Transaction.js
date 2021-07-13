import { useRouter } from "next/router";
import { useCallback } from "react";

function transaction({ userconfig, setuserconfig, showmenu }) {
  console.log(
    `**************${JSON.stringify(userconfig)} , categories : ${
      userconfig.categories
    } , showmenu : ${showmenu}`
  );
  const router = useRouter();
  const handleSubmit = useCallback((event) => {
    event.preventDefault();

    fetch("/api/user/transaction", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        date: event.target.date.value,
        account: event.target.account.value,
        description: event.target.description.value,
        amount: event.target.amount.value,
        category: event.target.category.value,
      }),
    })
      .then((res) => {
        console.log(`Front end authentication response ${JSON.stringify(res)}`);
        if (res.ok) {
          console.log(`res ok ${res}`);
          router.push("/home");
        } else {
          console.log(`res ok else ${res}`);
          router.push("/transaction");
        }
      })
      .catch((error) => {
        console.log(
          `Front end authentication error response ${JSON.stringify(error)}`
        );
        router.push("/");
      });
  }, []);

  return (
    <form
      className={"mt-6 " + (showmenu == "AddTransaction" ? "block" : "hidden")}
      onSubmit={handleSubmit}
    >
      <div className="grid grid-flow-col gap-2 mb-1">
        <input
          type="date"
          name="date"
          id="date"
          placeholder="Transaction Date"
          className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
          autoFocus
          autoComplete="true"
          required
        />
        <select
          name="account"
          className="form-select block w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 font-mono"
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
        <select
          name="category"
          className="form-select block w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
        >
          <option>Uncategorized</option>
          {userconfig.expenseCategories.map((category, key) => (
            <option key={key}>{category}</option>
          ))}
        </select>
      </div>
      <div>
        <textarea
          name="description"
          className="form-textarea w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
          rows="3"
          placeholder="Transaction Description"
          required
        ></textarea>
      </div>
      <div className="grid grid-flow-col gap-2 mb-1">
        <input
          type="text"
          className="form-input w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
          id="amount"
          name="amount"
          placeholder="Amount"
          autoFocus
          autoComplete="true"
          required
        />
      </div>

      <button
        type="submit"
        className="block w-full bg-indigo-500 hover:bg-indigo-400 focus:bg-indigo-400 text-white font-semibold rounded-lg
                px-4 py-3 mt-6"
      >
        Add Transaction
      </button>
    </form>
  );
}

export default transaction;
