import useModalLayout from "/src/hooks/useModalLayout";
import WithOutAuth from "../../src/middleware/auth/WithOutAuth";
import Confirmation from "../../src/components/register/Confirmation";
import useLocalStorage from "../../src/hooks/useLocalStorage";
import Consts from "../../src/utility/Consts";
import { useState } from "react";

const Confirm = ({ ...props }) => {

  const ModalLayout = useModalLayout({ layoutName: "step" });
  const { lsGet } = useLocalStorage("session")
  const [usrInfo] = useState(lsGet(Consts.SS_UserSignUp))

  return usrInfo ? (
    <ModalLayout
      maxStep={4}
      activeStep={2}
      className={"flex justify-center items-center"}
      configure={{
        back: false,
        footer: false,
      }}
      onCloseKeys={["signInUp"]}
    >
      <div className="flex flex-col items-center justify-center">
        <div className=" flex flex-col justify-center w-full">
          <Confirmation usr={usrInfo}/>
        </div>
      </div>
    </ModalLayout>
  ) : null
};

export default WithOutAuth(Confirm);
