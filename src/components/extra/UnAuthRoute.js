import {Route} from "react-router-dom";
import { useUser } from "../../context/userContext";


const UnAuthRoute = ({component: Component, ...rest}) => {
  
    const {user} = useUser()
  
    return (
      <Route
        {...rest}
        render={(props) => !user
          ? <Component {...props} />
          : null}
      />
    )
}

export default UnAuthRoute