import { useEffect, useState } from "react";
import useModalLayout from "/src/hooks/useModalLayout";

import Register from "/src/components/register/register";

import Confirmation from "/src/components/register/confirmation";
import Interests from "/src/components/register/interests";
import UserInformation from "/src/components/register/userInformation";

const SignIn1 = ({ type }) => {
  const maxStep = 4;

  const ModalLayout = useModalLayout({ layoutName: "step" });
  const [activeStep, setActiveStep] = useState(1);

  const [steps] = useState({
    1: {
      comp: Register,
      conf: {
        back: true,
        footer: true,
      },
    },
    2: {
      comp: Confirmation,
      conf: {
        back: false,
        footer: false,
      },
    },
    3: {
      comp: UserInformation,
      conf: {
        back: false,
        footer: false,
      },
    },
    4: {
      comp: Interests,
      conf: {
        back: false,
        footer: false,
      },
    },
  });

  const [Step, setStep] = useState(steps[activeStep]);

  const submitHandler = () => {
    if (activeStep < maxStep) {
      setActiveStep(activeStep + 1);
    }
  };

  useEffect(() => {
    setStep(steps[activeStep]);
  }, [activeStep, steps]);

  return (
    <ModalLayout
      maxStep={maxStep}
      activeStep={activeStep}
      className={"flex justify-center items-center"}
      configure={Step.conf}
    >
      <div className="flex flex-col items-center justify-center">
        <div className=" flex flex-col justify-center w-full">
          <Step.comp nextStep={submitHandler} />
        </div>
      </div>
    </ModalLayout>
  );
};

export default SignIn1;
