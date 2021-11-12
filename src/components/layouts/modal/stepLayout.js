import { useRouter } from "next/router";
import { useEffect } from "react";
import useScrollBlock from "../../../hooks/useScrollBlock";
import { _modalisOpen } from "../../../utility/Util";
import Stepper from "../../stepper";
import Link from "next/link";

const StepModalLayout = ({
  children,
  activeStep,
  maxStep,
  configure,
  ...props
}) => {
  const router = useRouter();
  const type = router.query.signInUp;
  const [blockScroll, allowScroll] = useScrollBlock();

  useEffect(() => {
    blockScroll();
    return () => allowScroll();
  }, [allowScroll, blockScroll]);

  const close = () => {
    router.back();
  };
  return (
    <div className={`backdrop ${props.className}`}>
      <div className="popup absolute bg-white rounded-xl shadow-xl">
        <>
          <div className="h-[60px] px-[16px] py-[20px] flex items-center relative justify-between ">
            {configure.back && (
              <div
                className={`w-[18px] h-[15px]`}
                onClick={() =>
                  router.replace(
                    `?signInUp=signUp&isModal=false`,
                    `/signInUp/signUp`
                  )
                }
              >
                <span className="cursor-pointer icon-fi-rs-back-2 text-18px text-caak-extraBlack pr-1" />
              </div>
            )}
            {type === "stepUp" ? (
              <div className="absolute right-1/2">
                <p className="text-sm">
                  {activeStep}/{maxStep}
                </p>
              </div>
            ) : null}

            <div className="absolute right-4" onClick={() => close()}>
              <span className="icon-fi-rs-close  text-caak-generalblack text-14px bg-caak-titaniumwhite w-c3 h-c3 flex items-center justify-center rounded-full cursor-pointer" />
            </div>
          </div>
          {type === "stepUp" ? (
            <Stepper
              currentStep={activeStep}
              maxStep={maxStep}
              bgColor={"bg-caak-algalfuel"}
            />
          ) : null}
        </>

        {children}
        {/*Footer*/}
        {configure.footer ? (
          <div
            className={
              "signFooter mb-c1 flex self-end justify-between border-t items-center divide-x divide-gray-primary mt-8 pt-4  px-c11 divide-opacity-20 text-sm "
            }
          >
            <div className="text-caak-blue text-15px">
              <span>
                {type === "signup" ? "Бүртгэлтэй " : "Шинэ "} хэрэглэгч бол
              </span>

              <Link
                href={`/signInUp/${type === "signup" ? "signin" : "signup"}`}
                passHref
              >
                <span
                  // onClick={() =>
                  //   router.replace({
                  //     pathname: "/register/",
                  //     state,
                  //   })
                  // }
                  className="text-caak-primary text-15px font-bold cursor-pointer"
                >
                  {type === "signup" ? " Нэвтрэх" : " Бүртгүүлэх"}
                </span>
              </Link>
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
