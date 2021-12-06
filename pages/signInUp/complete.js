import useModalLayout from "/src/hooks/useModalLayout";
import Completed from "../../src/components/register/completed";

const Complete = ({ ...props }) => {

  const ModalLayout = useModalLayout({ layoutName: "step" });

  return (
    <ModalLayout
      maxStep={4}
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
          <Completed />
        </div>
      </div>
    </ModalLayout>
  );
};

export default Complete
