import { useUser } from "../../context/userContext";

const WithInterestComplete = (WrappedComponent) => {
  return (props) => {
    
    const { user, cognitoUser } = useUser()
    if (cognitoUser && user && user.category && user.category.items.length > 0) {
      return null;
    } else {
      return <WrappedComponent {...props} />;
    }
  };
};

export default WithInterestComplete;
