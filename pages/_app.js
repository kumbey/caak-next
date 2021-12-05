import "../styles/globals.css";
import { WrapperProvider } from "../src/context/wrapperContext";
import { UserProvider } from "../src/context/userContext";
import Amplify from "@aws-amplify/core";
import Storage from "@aws-amplify/storage";
import awsExports from "../src/aws-exports";
import NavBar from "../src/components/navigation/NavBar";
import Modals from "../src/components/modals";

Amplify.configure({ ...awsExports, ssr: true });
Storage.configure({ level: "public" });

function MyApp({ Component, pageProps }) {
  return (
    <WrapperProvider>
      <UserProvider>
        <NavBar />
        {/*<div className={"site-container"}>*/}
        <Component {...pageProps} />
        {/*</div>*/}
        <Modals />
      </UserProvider>
    </WrapperProvider>
  );
}

export default MyApp;
