import { useUser } from "../../context/userContext";

const WithUserComplete = (WrappedComponent) => {
  return (props) => {
    
    const { user, cognitoUser } = useUser()

    if (cognitoUser && user) {
      return null;
    } else {
      return <WrappedComponent {...props} />;
    }
  };
};

export default WithUserComplete;
