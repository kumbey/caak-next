import { useEffect } from "react";
import useLocalStorage from "../../hooks/useLocalStorage";
import Consts from "../../utility/Consts";

const AddPostGuideCard = ({open , setOpen}) => {

    const { lsSet, lsGet} = useLocalStorage("session")

    
    useEffect(() => {
        setOpen(lsGet(Consts.addPostKey).addPostGuide)
    }, [setOpen, lsGet])

    return open ? 
    (
        <div
            onClick={(e) => {
                e.stopPropagation();
            }}
            className={
            "absolute top-[50px] addPostNewGroupCard flex flex-col items-center w-[300px] p-[25px] rounded-[8px]"
            }
        >
            <p className={"font-bold text-[18px] text-white text-center"}>
                Пост нэмэх товч үргэлж тантай хамт
            </p>
            <p className="text-white text-[15px] text-center mt-[10px]">Саак мэдрэмжээ бусдад хуваалцах боломж.</p>
            <div
                onClick={() => {
                    setOpen(false)
                    lsSet(Consts.addPostKey, {...lsGet(Consts.addPostKey), addPostGuide: false})
                }}
                className={
                    "flex text-[16px] font-medium items-center justify-center text-center mt-[17px] w-[130px] h-[36px] bg-white text-caak-generalblack rounded-[8px]"
                }
                >
                Ok
            </div>
        </div>
    ) : null
};

export default AddPostGuideCard;