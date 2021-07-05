import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useCallback, useEffect } from "react";
import { signIn, signOut, useSession, getSession } from "next-auth/client";

function LoginPage() {
  const [session, loading] = useSession();
  console.log("Login page session values" + JSON.stringify(session));
  const router = useRouter();
  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    fetch(
      "/api/user/user?" +
        new URLSearchParams({
          email: session.user.email,
          password: "password",
        }),
      {
        method: "GET",
      }
    )
      .then((res) => {
        console.log(`Front end authentication response ${JSON.stringify(res)}`);
        if (res.ok) {
          console.log(`res ok ${res}`);
          router.push("/home");
        } else {
          console.log(`res ok else ${res}`);
          router.push("/");
        }
      })
      .catch((error) => {
        console.log(
          `Front end authentication error response ${JSON.stringify(res)}`
        );
        router.push("/");
      });
  }, []);

  return (
    <div>
      <Head>
        <title>LotusMoney</title>
        <meta name="description" content="All in one personal finance app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <div className="flex flex-col md:flex-row h-screen items-center justify-around">
          <div
            className="bg-white w-full md:max-w-md lg:max-w-full md:mx-auto md:w-1/2 xl:w-1/3 h-screen px-6 lg:px-16 xl:px-12
        flex items-center justify-center"
          >
            <div className="w-full h-100">
              <h1 className="text-xl md:text-2xl font-bold leading-tight mt-12">
                Log in to your account
              </h1>
              <form onSubmit={handleSubmit} className="mt-6">
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

                <div className="mt-4">
                  <label className="block text-gray-700">Password</label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="Enter Password"
                    minLength="6"
                    className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500
                focus:bg-white focus:outline-none"
                    required
                  />
                </div>

                <div className="text-right mt-2">
                  <a
                    href="/api/user/forgotpwd"
                    className="text-sm font-semibold text-gray-700 hover:text-blue-700 focus:text-blue-700"
                  >
                    Forgot Password?
                  </a>
                </div>

                <button
                  type="submit"
                  className="w-full block bg-indigo-500 hover:bg-indigo-400 focus:bg-indigo-400 text-white font-semibold rounded-lg
              px-4 py-3 mt-6"
                >
                  Log In
                </button>
              </form>

              <hr className="my-6 border-gray-300 w-full" />

              {!session && (
                <>
                  <button
                    type="button"
                    className="w-full block bg-white hover:bg-gray-100 focus:bg-gray-100 text-gray-900 font-semibold rounded-lg px-4 py-3 border border-gray-300"
                    onClick={() =>
                      signIn("google", {
                        callbackUrl: "http://localhost:3000/home",
                      })
                    }
                  >
                    <div className="flex items-center justify-center">
                      <span className="ml-4">Log in with Google</span>
                    </div>
                  </button>
                </>
              )}
              {session && <>{router.push("/home")}</>}

              <p className="mt-8">
                Need an account?{" "}
                <Link href="/createuser">
                  <a className="text-blue-500 hover:text-blue-700 font-semibold">
                    Create an account
                  </a>
                </Link>
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default LoginPage;
