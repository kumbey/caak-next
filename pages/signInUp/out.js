import { useEffect } from "react";
import { useUser } from "../../src/context/userContext";

const SignOut = () => {
  const { logout } = useUser();

  useEffect(() => {
    logout();
    // eslint-disable-next-line
  }, []);

  return null;
};

export default SignOut;
