import { useRouter } from "next/router";
import { useEffect } from "react"
import useScrollBlock from "../../../hooks/useScrollBlock"
import { _modalisOpen } from "../../../utility/Util";

const DefaultModalLayout = ({children, ...props}) => {

    const router = useRouter();
    const [blockScroll, allowScroll] = useScrollBlock()

    useEffect(() => {
        blockScroll();
        return () => allowScroll();
    }, [allowScroll, blockScroll]);

    const close = () => {
        // router.replace('/about', undefined, { shallow: true })
        router.back()
    }

    return (
        <div
            className={`backdrop ${props.className}`}
        >
            <div className="popup absolute bg-white rounded-lg shadow-xl">
                <div
                onClick={() => close()}
                    className="pt-c6 pr-c6 absolute top-0 right-0"
                >
                    <span className="icon-fi-rs-close text-caak-generalblack text-12px bg-caak-titaniumwhite w-c3 h-c3 flex items-center justify-center rounded-full cursor-pointer" />
                </div>
                <div
                    className={
                        "text-center text-caak-generalblack mb-c2 font-bold text-24px pt-c5 "
                    }
                >
                    {props.title}
                </div>
                {children}
            </div>
        </div>
    )
}

export default DefaultModalLayout