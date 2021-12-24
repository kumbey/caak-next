import { Fragment, useEffect, useRef, useState } from "react";
import Loader from "../../loader";

const InfinitScroller = ({children, onNext, ...props}) => {

    const [isIntersecting, setIntersecting] = useState(false);
    const ref = useRef()

    useEffect(() => {

        const observer = new IntersectionObserver(([entry]) => setIntersecting(entry.isIntersecting))

        if(ref.current){
            observer.observe(ref.current)
        }

        return () => {
            if(ref.current){
                observer.unobserve(ref.current)
            }
        }

    },[ref])

    useEffect(() => {
        if(isIntersecting){
            onNext()
        }
    },[isIntersecting])

    return (
        <Fragment>
            {children}
            <div ref={ref} className={"self-center w-full h-[20px]"}>
                <Loader
                    ref={ref}
                    containerClassName={"self-center w-full h-[20px]"}
                    className={`bg-caak-primary ${
                    props.loading ? "opacity-100" : "opacity-0"
                    }`}
                />
            </div>
        </Fragment>
    )
    

}

export default InfinitScroller