function categories() {
  return (
    <form className="mt-6" action="/api/user/authenticate" method="POST">
      <div className="grid grid-flow-col gap-2 mb-1">
        <input
          type="date"
          name="transactiondate"
          id="transactiondate"
          placeholder="Transaction Date"
          className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
          autoFocus
          autoComplete="true"
          required
        />
        <select class="form-select block w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none">
          <option>State Bank Of India</option>
          <option>Axis Bank</option>
          <option>Kotak Mahindra Bank</option>
        </select>
      </div>
      <div>
        <textarea
          class="form-textarea w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
          rows="3"
          placeholder="Transaction Description"
          required
        ></textarea>
      </div>
      <div className="flex flex-col">
        <input
          type="number"
          class="form-input w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
          id="amount"
          placeholder="Amount"
          autoFocus
          autoComplete="true"
          required
        />
        <button
          type="submit"
          className="block w-full bg-indigo-500 hover:bg-indigo-400 focus:bg-indigo-400 text-white font-semibold rounded-lg
                px-4 py-3 mt-6"
        >
          Add Transaction
        </button>
      </div>
    </form>
  );
}

export default categories;
