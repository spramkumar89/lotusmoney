import { useRouter } from "next/router";
import { useCallback } from "react";

function transaction() {
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
          router.push("/transaction");
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
    <form className="mt-6" onSubmit={handleSubmit}>
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
          className="form-select block w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
        >
          <option>State Bank Of India</option>
          <option>Axis Bank</option>
          <option>Kotak Mahindra Bank</option>
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
        <select
          name="category"
          className="form-select block w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
        >
          <option>Grocery</option>
          <option>Shopping</option>
          <option>Miscellaneous</option>
        </select>
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
