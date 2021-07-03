import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useCallback, useEffect } from "react";
import { signIn, signOut, useSession } from "next-auth/client";
import { getSession } from "next-auth/client";

function LoginPage() {
  const [session, loading] = useSession();
  console.log("***********************" + JSON.stringify(session));
  const router = useRouter();
  const handleSubmit = useCallback((e) => {
    e.preventDefault();

    fetch(
      "/api/user/user?" +
        new URLSearchParams({
          email: e.target.email.value,
          password: e.target.password.value,
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
      {loading && <p>Loading..</p>}
      {!session && (
        <>
          Not signed in <br />
          <button
            onClick={() =>
              signIn("google", { callbackUrl: "http://localhost:3000/" })
            }
          >
            Sign in
          </button>
        </>
      )}
      {session && (
        <>
          Signed in as {session.user.name} <br />
          <button onClick={() => signOut()}>Sign out</button>
        </>
      )}
    </div>
  );
}

function oldLoginPageCode(){










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

            {/* <hr className="my-6 border-gray-300 w-full" />

            <button
              type="button"
              className="w-full block bg-white hover:bg-gray-100 focus:bg-gray-100 text-gray-900 font-semibold rounded-lg px-4 py-3 border border-gray-300"
            >
              <div className="flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6"
                  viewBox="0 0 48 48"
                >
                  <defs>
                    <path
                      id="a"
                      d="M44.5 20H24v8.5h11.8C34.7 33.9 30.1 37 24 37c-7.2 0-13-5.8-13-13s5.8-13 13-13c3.1 0 5.9 1.1 8.1 2.9l6.4-6.4C34.6 4.1 29.6 2 24 2 11.8 2 2 11.8 2 24s9.8 22 22 22c11 0 21-8 21-22 0-1.3-.2-2.7-.5-4z"
                    />
                  </defs>
                  <clipPath id="b"></clipPath>
                  <path
                    clipPath="url(#b)"
                    fill="#FBBC05"
                    d="M0 37V11l17 13z"
                  />
                  <path
                    clipPath="url(#b)"
                    fill="#EA4335"
                    d="M0 11l17 13 7-6.1L48 14V0H0z"
                  />
                  <path
                    clipPath="url(#b)"
                    fill="#34A853"
                    d="M0 37l30-23 7.9 1L48 0v48H0z"
                  />
                  <path
                    clipPath="url(#b)"
                    fill="#4285F4"
                    d="M48 48L17 24l-4-3 35-10z"
                  />
                </svg>
                <span className="ml-4">Log in with Google</span>
              </div>
            </button> */}

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

export default LoginPage;
