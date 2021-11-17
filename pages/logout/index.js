import Auth from "@aws-amplify/auth";
import { Hub } from "@aws-amplify/core";
import { useEffect, useState } from "react";
import { useUser } from "../../src/context/userContext";
import { useRouter } from "next/router";

const Redirect = () => {
  const router = useRouter();
  router.replace('/');
  return null
};

const Logout = () => {
  const [signedOut, setSignedOut] = useState(false);
  const { setUser } = useUser();

  useEffect(() => {
    setUser(null);
    logout();
    return () => {
      setSignedOut(null);
    };
    // eslint-disable-next-line
  }, []);

  const logout = async () => {
    await Auth.signOut();
  };

  Hub.listen("auth", ({ payload: { event } }) => {
    switch (event) {
      case "signOut":
        setSignedOut(true);
        break;
      default:
        break;
    }
  });

  return signedOut ? <Redirect/> : null;
};

export default Logout;
