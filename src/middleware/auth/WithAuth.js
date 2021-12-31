import { useUser } from "../../context/userContext";
import { useRouter } from "next/router";

const WithAuth = (WrappedComponent) => {
  return (props) => {

    const { isLogged } = useUser();
    const router = useRouter()

    if (!isLogged) {
      return null;
    } else {
      return <WrappedComponent {...props} />;
    }
  };
};

export default WithAuth;