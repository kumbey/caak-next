import API from "@aws-amplify/api";
import { useState } from "react";
import { useUser } from "../../context/userContext";
import { graphqlOperation } from "@aws-amplify/api-graphql";

const WithOutAuth = (WrappedComponent) => {
  return (props) => {
    
    const { isLogged } = useUser()
    const [isCompleted, setIsCompleted] = useState(true) 

    const fetchUserInfo = async () => {
        API.graphql(graphqlOperation())
    }

    if (isLogged) {
      return null;
    } else {
      return <WrappedComponent {...props} />;
    }
  };
};

export default WithOutAuth;
