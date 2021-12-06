import useModalLayout from "/src/hooks/useModalLayout";
import { useRouter } from "next/router";
import Interests from "../../src/components/register/Interests";
import WithInterestComplete from "../../src/middleware/auth/WithInterestComplete";

const Intrst = ({ ...props }) => {

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
          <Interests />
        </div>
      </div>
    </ModalLayout>
  );
};

export default WithInterestComplete(Intrst);
