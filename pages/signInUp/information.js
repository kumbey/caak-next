import useModalLayout from "../../src/hooks/useModalLayout";
import UserInformation from "../../src/components/register/UserInformation";
import WithUserComplete from "../../src/middleware/auth/WithUserComplete";

const Information = () => {

  const ModalLayout = useModalLayout({ layoutName: "step" });

  return (
    <ModalLayout
      maxStep={3}
      activeStep={3}
      className={"flex justify-center items-center"}
      configure={{
        back: false,
        footer: false,
      }}
      onCloseKeys={["signInUp"]}
    >
      <div className="flex flex-col items-center justify-center">
        <div className=" flex flex-col justify-center w-full">
          <UserInformation />
        </div>
      </div>
    </ModalLayout>
  );
};

export default WithUserComplete(Information);
