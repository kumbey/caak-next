import useScrollBlock from "../../hooks/useScrollBlock";
import {useEffect} from "react";

const Backdrop = ({children, ...props}) => {
    const [blockScroll, allowScroll] = useScrollBlock();
    useEffect(() => {
        blockScroll();
        return () => allowScroll();
    }, [allowScroll, blockScroll]);
    return (
        <div
            className={`backdrop ${props.className}`}
        >
            <div className="popup absolute bg-white rounded-lg shadow-xl">
                <div
                onClick={() => closeModal(history, state)}
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
    );
};

export default Backdrop;