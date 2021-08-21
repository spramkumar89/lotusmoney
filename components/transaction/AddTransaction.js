import { useCallback } from "react";
import { getSession } from "next-auth/client";
import { useSelector, useDispatch } from "react-redux";
import moment from "moment";

function transaction() {
  /* console.log(
    `**************${JSON.stringify(userconfig)} , categories : ${
      userconfig.categories
    } , showmenu : ${showmenu}`
  ); */
  const accounts = useSelector((state) => state.user.accounts);
  const cards = useSelector((state) => state.user.cards);
  const incomeCategories = useSelector(
    (state) => state.appConfig.incomeCategories
  );
  const expenseCategories = useSelector(
    (state) => state.appConfig.expenseCategories
  );

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
        transactionType: event.target.transactionType.value,
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
    <form className={"mt-3"} onSubmit={handleSubmit}>
      <div className="flex flex-wrap mb-2 mt-2 px-4 w-full">
        <div className="flex flex-col px-4 py-2">
          <label htmlFor="date" className="text-gray-600 font-mono">
            Transaction Date
          </label>
          <input
            type="date"
            name="date"
            id="date"
            placeholder="Transaction Date"
            defaultValue={moment().format("yyyy-MM-DD")}
            className="rounded-lg bg-gray-200"
            autoFocus
            autoComplete="true"
            required
          />
        </div>
        <div className="flex flex-col px-4 py-2">
          <label htmlFor="transactionType" className="text-gray-600 font-mono">
            Transaction Type
          </label>
          <select
            name="transactionType"
            className="form-select rounded-lg font-mono"
            defaultValue={"DEFAULT"}
          >
            <option value="DEFAULT" disabled hidden>
              Transaction Type
            </option>
            <option className="bg-blue-300 text-gray-700">Income</option>
            <option className="bg-blue-300 text-gray-700">Expense</option>
          </select>
        </div>
        <div className="flex flex-col px-4 py-2">
          <label htmlFor="account" className="text-gray-600 font-mono">
            Source Account
          </label>
          <select
            name="account"
            className="form-select rounded-lg font-mono"
            defaultValue={"DEFAULT"}
          >
            <option value="DEFAULT" disabled hidden>
              Select the source
            </option>
            <option
              disabled
              className="bg-yellow-600 font-mono text-sm text-gray-300 font-semibold uppercase"
            >
              ACCOUNTS
            </option>
            {accounts.map((account, key) => (
              <option className="bg-gray-200 text-gray-600" key={account}>
                {account}
              </option>
            ))}
            <option
              disabled
              className="bg-yellow-600 font-mono text-sm text-gray-300 font-semibold uppercase"
            >
              CARDS
            </option>
            {cards.map((card, key) => (
              <option className="bg-gray-200 text-gray-600" key={card}>
                {card}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-col px-4 py-2">
          <label htmlFor="amount" className="text-gray-600 font-mono">
            Enter the Amount
          </label>
          <input
            type="text"
            className="form-input rounded-lg font-mono"
            name="amount"
            placeholder="Amount"
            autoFocus
            autoComplete="true"
            required
          />
        </div>
        <div className="flex flex-col px-4 py-2">
          <label htmlFor="description" className="text-gray-600 font-mono">
            Enter the Description
          </label>
          <div>
            <textarea
              name="description"
              className="form-textarea rounded-lg h-28 w-80 font-mono"
              rows="1"
              placeholder="Transaction Description"
              required
            ></textarea>
          </div>
        </div>
        <div className="flex px-4 py-3 items-end">
          <div>
            <label htmlFor="category" className="text-gray-600 font-mono">
              Select the Category
            </label>
            <select
              name="category"
              className="form-select block rounded-lg font-mono"
              defaultValue={"Uncategorized"}
            >
              <option value="Uncategorized" disabled hidden>
                Select the category
              </option>
              <option
                disabled
                className="bg-yellow-600 font-mono text-sm text-gray-300 font-semibold uppercase"
              >
                INCOME CATEGORIES
              </option>
              {incomeCategories.map((income, key) => (
                <option className="bg-gray-200 text-gray-600" key={income}>
                  {income}
                </option>
              ))}
              <option
                disabled
                className="bg-yellow-600 font-mono text-sm text-gray-300 font-semibold uppercase"
              >
                EXPENSE CATEGORIES
              </option>
              {expenseCategories.map((expense, key) => (
                <option className="bg-gray-200 text-gray-600" key={expense}>
                  {expense}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="flex px-2 py-3 items-end">
          <button
            type="submit"
            className="text-gray-200 font-mono font-bold uppercase rounded-lg 
          px-4 py-2 bg-blue-800 hover:bg-blue-300 hover:text-gray-500"
          >
            Add Transaction
          </button>
        </div>
      </div>
    </form>
  );
}

export default transaction;
