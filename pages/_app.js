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
import RedirectUrls from "../src/redirectUrls";
import Script from "next/script";
import Head from "next/head";

Router.events.on("routeChangeStart", () => NProgress.start());
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

const updatedAwsConfig = {
  ...awsExports,
  oauth: {
    ...awsExports.oauth,
    redirectSignIn: RedirectUrls.redirectSignIn,
    redirectSignOut: RedirectUrls.redirectSignOut,
  },
  ssr: true,
};

Amplify.configure(updatedAwsConfig);
Storage.configure({ level: "public" });

const MyApp = ({ Component, pageProps }) => {
  return (
    <WrapperProvider>
      <Head>
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-G71ES07K2X"
        />
        <Script
          id={"google-analytics"}
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments)}
              gtag(js, new Date());
              gtag(config, G-G71ES07K2X);
            `,
          }}
        />
      </Head>
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
};

export default MyApp;
