import useModalLayout from "../../src/hooks/useModalLayout";
import ForgotPass from "../../src/components/login/ForgotPass";

const ForgotPassword = ({ ...props }) => {
  const ModalLayout = useModalLayout({ layoutName: "step" });

  return (
    <ModalLayout
      maxStep={4}
      activeStep={3}
      className={"flex justify-center items-center"}
      configure={{
        back: false,
        footer: false,
        hideCount: true,
        hideProgress: true,
      }}
      onCloseKeys={["signInUp"]}
    >
      <div className="flex flex-col items-center justify-center">
        <div className=" flex flex-col justify-center w-full">
          <ForgotPass />
        </div>
      </div>
    </ModalLayout>
  );
};

export default ForgotPassword;
