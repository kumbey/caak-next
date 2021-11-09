import DefaultModalLayout from "../components/layouts/modal/default"


const layouts = {
    default: DefaultModalLayout,
}

const useModalLayout = (props) => {

    const layoutName = (props && props.layoutName) ? props.layoutName : "default"
    const layout = layouts[layoutName]

    if(!layout){
        console.log(`${layoutName}: Layout not found`)
    }

    return layout
}

export default useModalLayout