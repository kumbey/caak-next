import Button from "/src/components/button";
import { useEffect, useState } from "react";
import useModalLayout from "/src/hooks/useModalLayout";

import Register from "/src/components/register/register";

import Confirmation from "../../../src/components/register/confirmation";
import Interests from "../../../src/components/register/interests";
import UserInformation from "../../../src/components/register/userInformation";
import Completed from "../../../src/components/register/completed";

const SignIn1 = ({ type }) => {
  const maxStep = 4;

  const ModalLayout = useModalLayout({ layoutName: "step" });
  const [activeStep, setActiveStep] = useState(1);
  const [activeType, setActiveType] = useState("phone");

  const handleSubmit = () => {
    if (activeStep <= maxStep) {
      setActiveStep(activeStep + 1);
    } else {
      setActiveStep(5);
    }
  };

  useEffect(() => {
    console.log(activeStep);
  }, [activeStep]);

  return (
    <ModalLayout
      maxStep={maxStep}
      type={"signup"}
      handleSubmit={handleSubmit}
      activeStep={activeStep}
      className={"flex justify-center items-center"}
    >
      <div
        className={
          "flex text-caak-generalblack justify-center text-center align-center  pb-c2 font-bold text-24px"
        }
      >
        {activeStep === 1 && "Бүртгэл үүсгэх"}
        {activeStep === 2 && "Баталгаажуулалт"}
        {activeStep === 3 && "Хувийн мэдээлэл"}
        {activeStep === 4 && "Таны сонирхол"}

        {/* Баталгаажуулах код <br /> илгээгдлээ */}
      </div>

      <div className="flex flex-col items-center justify-center">
        <div className=" flex flex-col justify-center w-full">
          <div className={`${activeStep === 1 ? "" : "hidden"}`}>
            <div className="flex mb-c2">
              <Button
                key={1}
                onClick={() => setActiveType("phone")}
                className={`w-full text-15px h-c32  rounded-none hover:bg-caak-titaniumwhite flex items-center justify-center font-bold  
                                    ${
                                      "phone" === activeType
                                        ? "bg-white text-caak-primary border-b-2 border-caak-primary "
                                        : "bg-transparent text-caak-aleutian"
                                    }
                                    `}
              >
                <span className="icon-fi-rs-phone text-20px " />
                <p className={`text-17px ml-px-10 font-medium `}>
                  Утасны дугаар
                </p>
              </Button>

              <Button
                key={2}
                onClick={() => setActiveType("mail")}
                className={`w-full text-15px h-c32 rounded-none  hover:bg-caak-titaniumwhite flex items-center justify-center font-bold  
                                    ${
                                      "mail" === activeType
                                        ? "bg-white text-caak-primary border-b-2 border-caak-primary "
                                        : "bg-transparent text-caak-aleutian"
                                    }
                                    `}
              >
                <span className="icon-fi-rs-mail text-20px mr-px-6" />
                <p className="text-17px ml-px-10 font-medium">Имэйл хаяг</p>
              </Button>
            </div>
            <div className={`${activeStep === 1 ? "" : "hidden"}`}>
              <Register
                activeType={activeType}
                handleSubmit={handleSubmit}
                activeStep={activeStep}
              />
            </div>
          </div>
          <div className={`${activeStep === 2 ? "" : "hidden"}`}>
            <Confirmation activeType={activeType} />
          </div>
          <div className={`${activeStep === 3 ? "" : "hidden"}`}>
            <UserInformation />
          </div>
          <div className={`${activeStep === 4 ? "" : "hidden"}`}>
            <Interests />
          </div>
          <div className={`${activeStep === 5 ? "" : "hidden"}`}>
            <Completed />
          </div>
        </div>
      </div>
    </ModalLayout>
  );
};

export default SignIn1;
