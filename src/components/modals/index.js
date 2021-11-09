import { useRouter } from "next/router";
import SignInUp from "../../../pages/signInUp/[signInUp]";
import { _modalisOpen } from "../../utility/Util";

const modals = [
    {
        name: "signInUp",
        comp: SignInUp,
        conditions: [
            {
                key: "signInUp",
                value: "signIn"
            },
            {
                key: "signInUp",
                value: "signUp"
            }
        ]
    }
]

const Modals = () => {

    const router = useRouter()
    const { isModal } = router.query

    return modals.map((modal, index) => {
        // IF singIn not in query return null 
        
        if(router.isReady && isModal){
            if(_modalisOpen({
                conditions: modal.conditions,
                query: router.query
            })){
                return <modal.comp key={index}/>
            }else{
                return null
            }
        }else{
            return null
        }
    })
}

export default Modals