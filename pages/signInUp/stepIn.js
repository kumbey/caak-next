import useModalLayout from "/src/hooks/useModalLayout";
import { useState, useEffect } from "react";

import Login from "/src/components/login/Login";
import ForgotPass from "/src/components/login/ForgotPass";
import PassConfirmation from "/src/components/login/PassConfirmation";

const SignIn1 = ({ ...props }) => {
  const maxStep = 3;

  const ModalLayout = useModalLayout({ layoutName: "step" });
  const [activeStep, setActiveStep] = useState(1);

  const [steps] = useState({
    1: {
      comp: Login,
      conf: {
        back: true,
        footer: true,
      },
    },
    2: {
      comp: ForgotPass,
      conf: {
        back: true,
        footer: false,
      },
    },
    3: {
      comp: PassConfirmation,
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

    return () => {
      setStep(null)
    }

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
