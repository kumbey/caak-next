import { useState } from "react";
import Image from "next/image";
import successImg from "/public/assets/images/Successfully.svg";
import Button from "../../src/components/button";
import { useRouter } from "next/router";

const Completed = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  return (
    <div className={`backdrop flex justify-center items-center`}>
      <div className="popup absolute bg-white rounded-xl pt-[46px] shadow-xl">
        <div className="flex flex-col items-center mt-1">
          <Image width={182} height={144} src={successImg} alt={"success"} />
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
        <div className="my-[40px] px-[40px] ph:px-c2 text-caak-generalblack text-14px flex items-center justify-between ">
          <Button
            loading={loading}
            onClick={() => router.back()}
            className={
              "disabled: rounded-md w-full h-c9 text-17px font-bold bg-caak-secondprimary"
            }
          >
            {loading ? (
              "Уншиж байна"
            ) : (
              <span className="icon-fi-rs-thick-check h-[16px] w-[20px]" />
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Completed;
