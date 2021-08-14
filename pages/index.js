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

      <main>
        <>
          {!session && (
            <>
              Not signed in <br />
              <button onClick={handleSignIn}>Sign in</button>
            </>
          )}
          {session && router.push("/home")}
        </>
      </main>
    </div>
  );
}

export default LoginPage;
