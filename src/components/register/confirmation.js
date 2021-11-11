import { useState } from "react";
import { useRouter } from "next/router";
import Button from "../button";
import OtpInput from "../input/OtpInput";
import { mailNumber } from "../../utility/Util";
import Consts from "/src/utility/Consts";
import Validate from "/src/utility/Validate";

const Confirmation = ({ activeType }) => {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [code, setCode] = useState("");

  const validate = {
    code: {
      value: code,
      type: Consts.typeConfirmationCode,
      onChange: setCode,
      ignoreOn: true,
    },
  };

  const { handleChange, errors, setErrors, handleSubmit, isValid } =
    Validate(validate);
  console.log(router);

  return (
    <div className="ph:w-full ">
      <div className="text-center text-15px text-caak-darkBlue ">
        {activeType === "phone"
          ? "Таны утасны дугаар болох "
          : "Таны имэйл хаяг болох "}
        {/* {mailNumber(router.username.replace("+976", ""))} руу <br /> */}
        99998888 руу <br />
        баталгаажуулах код илгээгдлээ!
      </div>
      <form onSubmit={(e) => e.preventDefault()}>
        <div className="mt-c11">
          <OtpInput
            errorMessage={errors.code}
            name={"code"}
            onChange={handleChange}
          />
        </div>
        <div className={" flex flex-col "}>
          <div className=" flex justify-center text-14px text-caak-darkBlue mt-7">
            Баталгаажуулах код дахин авах
          </div>
          <div className=" flex justify-center items-center text-14px text-caak-primary font-bold cursor-pointer">
            <span className={"icon-fi-rs-resend text-13px mr-1"} />
            Дахин илгээх
          </div>
        </div>
      </form>
    </div>
  );
};

export default Confirmation;
