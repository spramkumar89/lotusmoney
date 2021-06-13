function deleteUser() {
  return (
    <div>
      <form className="mt-6" action="/api/user/deleteuser" method="POST">
        <div>
          <label className="block text-gray-700">Email Address</label>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Enter Email Address"
            className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
            autoFocus
            autoComplete="true"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full block bg-indigo-500 hover:bg-indigo-400 focus:bg-indigo-400 text-white font-semibold rounded-lg
      px-4 py-3 mt-6"
        >
          Log In
        </button>
      </form>
    </div>
  );
}

export default deleteUser;
