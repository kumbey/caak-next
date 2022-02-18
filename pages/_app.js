import "../styles/globals.css";
import "simplebar/dist/simplebar.min.css";
import { WrapperProvider } from "../src/context/wrapperContext";
import { UserProvider } from "../src/context/userContext";
import Amplify, { Storage } from "aws-amplify";
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
    //It tracks when page is reloaded
    gtag.pageview(router.asPath);
    const handleRouteChange = (url) => {
      gtag.pageview(url);
    };
    router.events.on("routeChangeComplete", handleRouteChange);
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  //  eslint-disable-next-line
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
            _atrk_opts = { atrk_acct:"TDYMh1awVK00EN", domain:"caak.mn",dynamic: true};
        (function() { var as = document.createElement('script'); as.type = 'text/javascript'; as.async = true; as.src = "https://certify-js.alexametrics.com/atrk.js"; var s = document.getElementsByTagName('script')[0];s.parentNode.insertBefore(as, s); })();
          `,
        }}
        id={"alex-analytics"}
        type="text/javascript"
      />

      <Script
        id={"dx-tools"}
        dangerouslySetInnerHTML={{
          __html: `_type="text/javascript"
        window['_fs_debug'] = false;
        window['_fs_host'] = 'fullstory.com';
        window['_fs_script'] = 'edge.fullstory.com/s/fs.js';
        window['_fs_org'] = '181H9E';
        window['_fs_namespace'] = 'FS';
        (function(m,n,e,t,l,o,g,y){
        if (e in m) {if(m.console && m.console.log) { m.console.log('FullStory namespace conflict. Please set window["_fs_namespace"].');} return;}
        g=m[e]=function(a,b,s){g.q?g.q.push([a,b,s]):g._api(a,b,s);};g.q=[];
        o=n.createElement(t);o.async=1;o.crossOrigin='anonymous';o.src='https://'+_fs_script;
        y=n.getElementsByTagName(t)[0];y.parentNode.insertBefore(o,y);
        g.identify=function(i,v,s){g(l,{uid:i},s);if(v)g(l,v,s)};g.setUserVars=function(v,s){g(l,v,s)};g.event=function(i,v,s){g('event',{n:i,p:v},s)};
        g.anonymize=function(){g.identify(!!0)};
        g.shutdown=function(){g("rec",!1)};g.restart=function(){g("rec",!0)};
        g.log = function(a,b){g("log",[a,b])};
        g.consent=function(a){g("consent",!arguments.length||a)};
        g.identifyAccount=function(i,v){o='account';v=v||{};v.acctId=i;g(o,v)};
        g.clearUserCookie=function(){};
        g.setVars=function(n, p){g('setVars',[n,p]);};
        g._w={};y='XMLHttpRequest';g._w[y]=m[y];y='fetch';g._w[y]=m[y];
        if(m[y])m[y]=function(){return g._w[y].apply(this,arguments)};
        g._v="1.3.0";
      })(window,document,window['_fs_namespace'],'script','user');
      `,
        }}
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
