import PassConfirmation from "../../src/components/login/PassConfirmation";
import useModalLayout from "../../src/hooks/useModalLayout";

const ResetPassword = ({ ...props }) => {

  const ModalLayout = useModalLayout({ layoutName: "step" });

  return (
    <ModalLayout
      maxStep={2}
      activeStep={2}
      className={"flex justify-center items-center"}
      configure={{
        back: false,
        footer: false,
      }}
    >
      <div className="flex flex-col items-center justify-center">
        <div className=" flex flex-col justify-center w-full">
          <PassConfirmation />
        </div>
      </div>
    </ModalLayout>
  );
};

export default ResetPassword;
