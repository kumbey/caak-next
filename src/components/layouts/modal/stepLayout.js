import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import useScrollBlock from "../../../hooks/useScrollBlock";
import { _modalisOpen } from "../../../utility/Util";
import Stepper from "../../stepper";
import Button from "../../button";

const StepModalLayout = ({
  children,
  handleSubmit,
  activeStep,
  setActiveStep,
  type,
  maxStep,
  ...props
}) => {
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const [blockScroll, allowScroll] = useScrollBlock();

  useEffect(() => {
    blockScroll();
    return () => allowScroll();
  }, [allowScroll, blockScroll]);

  const close = () => {
    // router.replace('/about', undefined, { shallow: true })
    router.back();
  };
  return (
    <div className={`backdrop ${props.className}`}>
      <div className="popup absolute bg-white rounded-xl shadow-xl">
        {activeStep <= maxStep ? (
          <>
            <div className="h-[60px] px-[16px] py-[20px] flex items-center relative justify-between ">
              <div
                className={`w-[18px] h-[15px] ${
                  activeStep === 2 || activeStep === 3 ? "hidden" : ""
                }`}
                onClick={() => setActiveStep(activeStep - 1)}
              >
                <span className="cursor-pointer icon-fi-rs-back-2 text-18px text-caak-extraBlack pr-1" />
              </div>
              <div className="absolute right-1/2">
                <p className="text-sm">
                  {activeStep}/{maxStep}
                </p>
              </div>
              <div className="absolute right-4" onClick={() => close()}>
                <span className="icon-fi-rs-close  text-caak-generalblack text-14px bg-caak-titaniumwhite w-c3 h-c3 flex items-center justify-center rounded-full cursor-pointer" />
              </div>
            </div>

            <Stepper
              currentStep={activeStep}
              maxStep={maxStep}
              bgColor={"bg-caak-algalfuel"}
            />

            <div
              className={
                "text-center text-caak-generalblack mb-9 font-bold text-24px  "
              }
            >
              {props.title}
            </div>
          </>
        ) : null}
        {children}
        <div className=" px-c8 ph:px-c2 text-caak-generalblack text-14px flex items-center justify-between mt-5">
          <Button
            loading={loading}
            onClick={() => handleSubmit()}
            className={
              "rounded-md w-full h-c9 text-17px font-bold bg-caak-secondprimary"
            }
          >
            Үргэлжлүүлэх
          </Button>
        </div>
        {/*Footer*/}
        {activeStep === 1 ? (
          <div
            className={
              "signFooter mb-c1 flex self-end justify-between border-t items-center divide-x divide-gray-primary mt-8 pt-4  px-c11 divide-opacity-20 text-sm "
            }
          >
            <div className="text-caak-blue text-15px">
              <span>
                {type === "signup" ? "Бүртгэлтэй " : "Шинэ "} хэрэглэгч бол
              </span>
              <span
                onClick={() =>
                  router.replace({
                    pathname: "/register/",
                    state,
                  })
                }
                className="text-caak-primary text-15px font-bold cursor-pointer"
              >
                {type === "signup" ? " Нэвтрэх" : " Бүртгүүлэх"}
              </span>
            </div>
            <span className="icon-fi-rs-help text-18px text-caak-darkBlue" />
          </div>
        ) : (
          <div className={" pt-10  "}></div>
        )}
      </div>
    </div>
  );
};

export default StepModalLayout;
