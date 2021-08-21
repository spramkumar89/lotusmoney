import Head from "next/head";
import Link from "next/link";
import router, { useRouter } from "next/router";
import { useCallback, useEffect } from "react";
import { signIn, signOut, useSession, getSession } from "next-auth/client";

function LoginPage() {
  const [session, loading] = useSession();

  const handleSignIn = () => {
    console.log("Inside handleSignIn function");
    signIn();
    console.log(`Inside handleSignIn : ${JSON.stringify(session)}`);
    router.push("/home");
  };

  return (
    <div>
      <Head>
        <title>LotusMoney</title>
        <meta name="description" content="All in one personal finance app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex flex-col justify-center items-center h-screen">
        <>
          {!session && (
            <>
              <h4 className="p-4 m-4 font-mono text-2xl font-bold uppercase">
                Lotus Money Application
              </h4>
              <button
                onClick={handleSignIn}
                className="p-4 bg-blue-600 rounded-lg font-mono text-lg text-gray-200"
              >
                Sign in with Google
              </button>
            </>
          )}
          {session && router.push("/home")}
        </>
      </main>
    </div>
  );
}

export default LoginPage;
