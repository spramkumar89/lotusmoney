import "../styles/globals.css";
import { Provider } from "next-auth/client";
import { Provider as NextAuthProvider } from "react-redux";
import { store } from "./state";

function MyApp({ Component, pageProps }) {
  return (
    <NextAuthProvider store={store}>
      <Provider session={pageProps.session}>
        <Component {...pageProps} />;
      </Provider>
    </NextAuthProvider>
  );
}

export default MyApp;
