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
import ViewPostModal from "../src/components/modals/ViewPostModal";
import ViewPostItemModal from "../src/components/modals/viewPostItemModal";

Amplify.configure({ ...awsExports, ssr: true });
Storage.configure({ level: "public" });
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
