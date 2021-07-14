import { useCallback } from "react";
import { getSession } from "next-auth/client";
import moment from "moment";

function transaction({ userconfig, setuserconfig, showmenu }) {
  console.log(
    `**************${JSON.stringify(userconfig)} , categories : ${
      userconfig.categories
    } , showmenu : ${showmenu}`
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
      }),
    })
      .then((res) => {
        console.log(`Front end authentication response ${JSON.stringify(res)}`);
        if (res.ok) {
          console.log(`res ok ${res}`);
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
      className={
        "mt-3 " + (showmenu == "ImportTransaction" ? "block" : "hidden")
      }
      onSubmit={handleSubmit}
    >
      <div className="grid grid-flow-col gap-2 mb-2 mt-2 items-center justify-center bg-grey-lighter">
        <label className="w-64 flex flex-row items-center justify-center justify-items-center px-2 py-2 bg-blue-100 text-gray-900 rounded-lg shadow-lg tracking-wide uppercase border border-blue cursor-pointer hover:bg-blue-200 hover:text-gray-800 select-none">
          <svg
            className="w-8 h-8"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <path d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z" />
          </svg>
          <span className="pl-4 text-base leading-normal">Select a file</span>
          <input type="file" className="hidden" />
        </label>
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
