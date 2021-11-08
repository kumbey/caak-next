import { useEffect } from "react"
import { useHistory, useLocation } from "react-router"

function WithOutAuth(){
   
   const history = useHistory()
   const location = useLocation()

    useEffect(() => {
      history.replace({pathname: "/login", state: {background: location}})
       //eslint-disable-next-line
    },[])

    return null

}

export default WithOutAuth