import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useCallback, useEffect } from "react";
import { signIn, signOut, useSession, getSession } from "next-auth/client";

function LoginPage() {
  const [session, loading] = useSession();
  console.log("Signout page session values" + JSON.stringify(session));

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
              <form onSubmit={signOut()} className="mt-6"></form>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default LoginPage;
