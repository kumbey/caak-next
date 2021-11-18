import { useUser } from "../../context/userContext";

const WithOutAuth = (WrappedComponent) => {
  return (props) => {
    
    const { isLogged } = useUser()

    if (isLogged) {
      return null;
    } else {
      return <WrappedComponent {...props} />;
    }
  };
};

export default WithOutAuth;
