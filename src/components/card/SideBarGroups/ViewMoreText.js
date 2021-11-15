const ViewMoreText = ({text}) => {
    return (
        <div className={"flex flex-row items-center cursor-pointer"}>
            <div className={"text-13px text-caak-primary my-[6px]"}>
                {text}
            </div>
            <div
                className={
                    "flex justify-center items-center ml-[4.5px] w-[12px] h-[12px] rotate-90"
                }
            >
                <span className={"icon-fi-rs-next text-[11px] text-caak-primary"} />
            </div>
        </div>
    );
};

export default ViewMoreText;