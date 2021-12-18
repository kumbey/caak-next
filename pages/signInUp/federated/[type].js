import { Auth, Hub } from "aws-amplify"
import { useRouter } from "next/router"
import { Fragment, useEffect } from "react"

function FederatedLogin(){

    const { query } = useRouter()

    const federated = async () => {
        if(query.type === "facebook"){
            const resp = await Auth.federatedSignIn({provider: "Facebook"})
            console.log(resp)
        }else if(query.type === "google"){
            Auth.federatedSignIn({provider: "Google"})
        }else{
           console.log("HERE")
        }
    }

    useEffect(() => {
        federated()
        Hub.listen('auth', ({ payload: { event } }) => {
            switch (event) {
                case 'signIn':
                    window.close()
                    break
                default:
            }
        });

        // eslint-disable-next-line
    })

    

    return (
        <Fragment>
        </Fragment>
    )

}

export default FederatedLogin