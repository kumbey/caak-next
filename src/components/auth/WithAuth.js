import { useEffect } from "react"
import { useUser } from "../../context/userContext"

const WithAuth = () => {

    const { user } = useUser()

    useEffect(() => {
        if(user){
            if(!user.sysUser){
                //do open information page
            }
        }
        // eslint-disable-next-line
    },[user])

    return null
}

export default WithAuth