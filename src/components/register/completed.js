import { useEffect, useState } from "react";
import successImg from "/public/assets/images/Successfully.svg";
import Button from "../button";
import { useRouter } from "next/router";
import { useUser } from "../../context/userContext";

const Completed = () => {
  const [loading] = useState(false);
  const { isLoginValid } = useUser();
  const router = useRouter();
  const submitHandler = async () => {
    try {
      isLoginValid();
      router.replace("/");
    } catch (ex) {
      console.log(ex);
    }
  };

  useEffect(() => {
    const handler = setTimeout(() => {
      submitHandler();
    }, 3000);

    return () => {
      clearTimeout(handler);
    };
  }, []);

  return (
    <div
      className={`flex justify-center items-center w-full shadow-xl rounded-xl bg-white`}
    >
      <div className="pt-[46px]">
        <div className="flex flex-col items-center mt-1">
          <img width={182} height={144} src={successImg.src} alt={"success"} />
          <div
            className={
              "text-center text-caak-generalblack mt-2 mb-4 font-bold text-24px  "
            }
          >
            Шинэ саак-т тавтай <br /> морилно уу!
          </div>
        </div>{" "}
        <div className="my-[40px] px-[40px] ph:px-c2 text-white text-14px flex items-center justify-between ">
          <Button
            loading={loading}
            onClick={() => submitHandler()}
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
