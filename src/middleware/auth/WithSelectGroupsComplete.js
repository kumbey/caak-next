import { useUser } from "../../context/userContext";

const WithSelectGroupsComplete = (WrappedComponent) => {
  return (props) => {
    const { user, cognitoUser } = useUser()
    
    if (cognitoUser && user && user.groups && user.groups.items.length > 0) {
      return null
    } else {
      return <WrappedComponent {...props} />;
    }
  };
};

export default WithSelectGroupsComplete;
