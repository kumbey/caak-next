import { Auth } from "aws-amplify"
import { useEffect } from "react"
import { useUser } from "../../src/context/userContext"

const SignOut = () => {

    const { logout } = useUser()

    useEffect(() => {
        logout()
    },[])

    return null

}

export default SignOut