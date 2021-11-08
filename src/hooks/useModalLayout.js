import { useRouter } from "next/router"
import { useRef, Fragment } from "react"
import DefaultModalLayout from "../components/layouts/modal/default"


const layouts = {
    default: DefaultModalLayout,
}

const useModalLayout = (props) => {

    const layoutName = (props && props.layoutName) ? props.layoutName : "default"
    const layout = layouts[layoutName]

    const router = useRouter()
    const query = router.query
    const isModal = useRef(false)

    if(!layout){
        console.log(`${layoutName}: Layout not found`)
    }

    return [layout, isModal]
}

export default useModalLayout