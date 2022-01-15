import "../styles/globals.css";
import "simplebar/dist/simplebar.min.css";
import { WrapperProvider } from "../src/context/wrapperContext";
import { UserProvider } from "../src/context/userContext";
import Amplify from "@aws-amplify/core";
import Storage from "@aws-amplify/storage";
import awsExports from "../src/aws-exports";
import NavBar from "../src/components/navigation/NavBar";
import Modals from "../src/components/modals";
import NProgress from "nprogress"; //nprogress module
import Router, { useRouter } from "next/router";
import ViewPostModal from "../src/components/modals/viewPostModal";
import ViewPostItemModal from "../src/components/modals/viewPostItemModal";
import RedirectUrls from "../src/redirectUrls";
import Script from "next/script";
import * as gtag from "../src/lib/gtag";
import { useEffect } from "react";
import ToastNotification from "../src/components/Toast/toastNotification";

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
  const router = useRouter();
  useEffect(() => {
    const handleRouteChange = (url) => {
      gtag.pageview(url);
    };
    router.events.on("routeChangeComplete", handleRouteChange);
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events]);

  return (
    <>
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-G71ES07K2X"
        strategy="afterInteractive"
      />
      <Script
        strategy="afterInteractive"
        id={"google-analytics"}
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${gtag.GA_TRACKING_ID}', {
              page_path: window.location.pathname,
            });
          `,
        }}
      />
      <Script
        dangerouslySetInnerHTML={{
          __html: `
            _atrk_opts = { atrk_acct:"TDYMh1awVK00EN", domain:"beta.caak.mn",dynamic: true};
        (function() { var as = document.createElement('script'); as.type = 'text/javascript'; as.async = true; as.src = "https://certify-js.alexametrics.com/atrk.js"; var s = document.getElementsByTagName('script')[0];s.parentNode.insertBefore(as, s); })();
          `,
        }}
        id={"alex-analytics"}
        type="text/javascript"
      />

      <WrapperProvider>
        <UserProvider>
          <div className={"caak-main-wrapper"}>
            <ToastNotification />
            <NavBar />
            <Component {...pageProps} />
          </div>
          <ViewPostModal />
          <ViewPostItemModal />
          <Modals />
        </UserProvider>
      </WrapperProvider>
    </>
  );
};

export default MyApp;
