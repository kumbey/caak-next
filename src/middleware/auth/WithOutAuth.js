import Auth from "@aws-amplify/auth";
import { useEffect, useState } from "react";

const WithOutAuth = (WrappedComponent) => {
  return (props) => {
    const [logged, setLogged] = useState("init");

    useEffect(async () => {
      try {
        await Auth.currentAuthenticatedUser();
        setLogged(true);
      } catch (ex) {
        setLogged(false);
      }
    }, []);

    if (logged === "init" || logged) {
      return null;
    } else {
      return <WrappedComponent {...props} />;
    }
  };
};

export default WithOutAuth;
