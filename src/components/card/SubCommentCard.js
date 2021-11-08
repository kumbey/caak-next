import React from "react";

const SubCommentCard = ({ name, comment }) => {
  return (
    <div className={"flex"}>
      <div className={"flex flex-row"}>
        <img
          className="m-34px w-8 h-8 rounded-full"
          src="https://i.pravatar.cc/100"
          alt="Alex"
        />

        <div className={"flex flex-col ml-2 justify-between"}>
          <div className={"relative flex flex-row items-center"}>
            <span className={"text-16px font-bold text-caak-generalblack"}>
              {name}
            </span>
            <span className={"text-14px text-caak-darkBlue mx-1"}>·</span>
            <span className={"text-14px text-caak-darkBlue mr-2"}>
              15мин өмнө
            </span>
            <div className={"cursor-pointer  right-0 text-caak-blue px-2"}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
                />
              </svg>
            </div>
          </div>
          <span
            className={
              "text-15px text-caak-generalblack leading-4  tracking-normal pt-2"
            }
          >
            {comment}
          </span>
          <div
            className={
              "flex flex row justify-between text-blue-primary text-14px py-3"
            }
          >
            <div className={"flex flex-row justify-center items-center"}>
              <div
                className={
                  "flex flex-row items-center justify-center mr-4 cursor-pointer hover:text-caak-primary group"
                }
              >
                <div
                  className={
                    "flex items-center group-hover:bg-caak-peachbreeze rounded-full p-2 h-8 w-8"
                  }
                >
                  <span className={"icon-fr-rs-caak text-18px"} />
                </div>
                <span className={"text-14px"}>4.5k</span>
              </div>
              <div className={"flex flex-row items-center mr-4 cursor-pointer"}>
                <i className={"icon-fi-rs-comment text-16px mr-1.5"} />
                <span className={"text-14px"}>Хариулах</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubCommentCard;
