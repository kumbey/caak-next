import { useEffect, useState } from "react";
import { Auth } from "aws-amplify";
import { useUser } from "../../context/userContext";

const WithAuth = (WrappedComponent) => {
  return (props) => {
    const [logged, setLogged] = useState("init");
    const { user } = useUser();

    useEffect(async () => {
      try {
        await Auth.currentAuthenticatedUser();
        setLogged(true);
      } catch (ex) {
        setLogged(false);
      }
    }, []);

    if (logged === "init" || !logged) {
      return null;
    } else {
      if (!user.sysUser) {
        history.push({
          pathname: "/register/main",
          state: { background: location, onlyInfo: true },
        });
      }
      return <WrappedComponent {...props} />;
    }
  };
};

export default WithAuth;