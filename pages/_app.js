import "../styles/globals.css";
import { WrapperProvider } from "../src/context/wrapperContext";
import { UserProvider } from "../src/context/userContext";
import Amplify from "@aws-amplify/core";
import Storage from "@aws-amplify/storage";
import awsExports from "../src/aws-exports";
import NavBar from "../src/components/navigation/NavBar";
import Modals from "../src/components/modals";
import NProgress from "nprogress"; //nprogress module
import "nprogress/nprogress.css"; //styles of nprogress
import Router from "next/router";
import ViewPostModal from "../src/components/modals/viewPostModal";
import ViewPostItemModal from "../src/components/modals/viewPostItemModal";
import Configure from "../src/configure";

if(typeof window !== 'undefined'){
  const isLocalhost = Boolean(
    window.location.hostname === "localhost" ||
      // [::1] is the IPv6 localhost address.
      window.location.hostname === "[::1]" ||
      // 127.0.0.1/8 is considered localhost for IPv4.
      window.location.hostname.match(
        /^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/
      )
  );
  
  const isDevelopment = Boolean(
    window.location.hostname === "https://main.d36nkdl3p18em1.amplifyapp.com/"
  );
  
  // Assuming you have two redirect URIs, and the first is for localhost and second is for production
  const [
    localRedirectSignIn,
    productionRedirectSignIn,
  ] = Configure.redirectSignIn.split(",");
  
  const [
    localRedirectSignOut,
    productionRedirectSignOut,
  ] = Configure.redirectSignOut.split(",");
  
  const updatedAwsConfig = {
    ...awsExports,
    oauth: {
      ...awsExports.oauth,
      redirectSignIn: isLocalhost ? localRedirectSignIn : productionRedirectSignIn,
      redirectSignOut: isLocalhost ? localRedirectSignOut : productionRedirectSignOut,
    },
    ssr: true
  }
  
  Amplify.configure(updatedAwsConfig);
  Storage.configure({ level: "public" });
}

Router.events.on("routeChangeStart", () => NProgress.start());
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());


function MyApp({ Component, pageProps }) {
  return (
    <WrapperProvider>
      <UserProvider>
        <div className={"caak-main-wrapper"}>
          <NavBar />
          <div>
            <Component {...pageProps} />
          </div>
        </div>
        <ViewPostModal />
        <ViewPostItemModal />
        <Modals />
      </UserProvider>
    </WrapperProvider>
  );
}

export default MyApp;
