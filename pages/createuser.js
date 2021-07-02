import Head from "next/head";
import { useRouter } from "next/router";
import { useCallback, useEffect } from "react";

function createaccount() {
  const router = useRouter();
  const handleSubmit = useCallback((e) => {
    e.preventDefault();

    fetch("/api/user/user", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: e.target.email.value,
        password: e.target.password.value,
      }),
    }).then((res) => {
      if (res.ok) {
        router.push("/");
      } else {
        router.push("/createaccount");
      }
    });
  }, []);

  useEffect(() => {
    // Prefetch the login page
    router.prefetch("/");
  }, []);

  return (
    <div>
      <Head>
        <title>LotusMoney</title>
        <meta name="description" content="All in one personal finance app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <div className="flex flex-col md:flex-row h-screen items-center">
          <div
            className="bg-white w-full md:max-w-md lg:max-w-full md:mx-auto md:w-1/2 xl:w-1/3 h-screen px-6 lg:px-16 xl:px-12
          flex items-center justify-center"
          >
            <div className="w-full h-100">
              <form onSubmit={handleSubmit} className="mt-6">
                <div>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    placeholder="Email"
                    className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
                    autoFocus
                    autoComplete="true"
                    required
                  />
                </div>
                <div>
                  <input
                    type="password"
                    className="form-input w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
                    id="password"
                    name="password"
                    placeholder="Password"
                    autoFocus
                    autoComplete="true"
                    required
                  />
                </div>
                <div>
                  <button
                    type="submit"
                    className="block w-full bg-indigo-500 hover:bg-indigo-400 focus:bg-indigo-400 text-white font-semibold rounded-lg
                px-4 py-3 mt-6"
                  >
                    Create Account
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default createaccount;
