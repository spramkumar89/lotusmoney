import "../styles/globals.css";
import { Provider as NextAuthProvider } from "next-auth/client";
import { Provider } from "react-redux";
import { store } from "../backend/state";

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <NextAuthProvider session={pageProps.session}>
        <Component {...pageProps} />;
      </NextAuthProvider>
    </Provider>
  );
}

export default MyApp;
