import { useState } from "react";
import Image from "next/image";
import successImg from "/public/assets/images/Successfully.svg";
import Button from "../button";
import { useRouter } from "next/router";
import { _objectWithoutKeys } from "../../utility/Util";

const Completed = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // const hide = () => {
  //   setLoading(true);
  //   if (router.query.isModal) {
  //     router.replace(
  //       {
  //         pathname: router.pathname,
  //         query: _objectWithoutKeys(router.query, ["signInUp"]),
  //       },
  //       undefined,
  //       { shallow: true, scroll: false }
  //     );
  //     setLoading(false);
  //   } else {
  //     setLoading(false);

  //     router.replace("/", undefined, {
  //       shallow: true,
  //       scroll: false,
  //     });
  //   }
  // };

  return (
    <div className={`backdrop flex justify-center items-center`}>
      <div className="popup absolute bg-white rounded-xl pt-[46px] shadow-xl">
        <div className="flex flex-col items-center mt-1">
          <img width={182} height={144} src={successImg.src} alt={"success"} />
          <div
            className={
              "text-center text-caak-generalblack mt-2 mb-4 font-bold text-24px  "
            }
          >
            Шинэ саак-т тавтай <br /> морилно уу!
          </div>
          <p className="text-center  text-caak-darkBlue">
            Таны сонирхлын дагуу танд зориулан <br /> фостуудыг бэлтэж байна.
          </p>
        </div>{" "}
        <div className="my-[40px] px-[40px] ph:px-c2 text-white text-14px flex items-center justify-between ">
          <Button
            loading={loading}
            onClick={router.back}
            className={
              "disabled: rounded-md w-full h-c9 text-17px font-bold bg-caak-primary"
            }
          >
            {loading ? (
              "Уншиж байна"
            ) : (
              <span className="icon-fi-rs-thick-check text-24px" />
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Completed;
