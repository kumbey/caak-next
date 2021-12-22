import { useEffect, useState } from "react";
import useModalLayout from "/src/hooks/useModalLayout";

import Register from "/src/components/register/Register";
import { useRouter } from "next/router";
import WithOutAuth from "../../src/middleware/auth/WithOutAuth";
import { _objectWithoutKeys } from "../../src/utility/Util";

const Up = ({ ...props }) => {
  
  const router = useRouter()
  const query = router.query

  const ModalLayout = useModalLayout({ layoutName: "step" });
  
  const back = () => {
      router.replace({
        query: {
          ...query,
          signInUp: "signUp"
        }
      }, "/signInUp/signUp", {shallow : true, scroll: false})
  }

  return (
    <ModalLayout
      maxStep={4}
      activeStep={1}
      className={"flex justify-center items-center"}
      configure={{
        back: true,
        footer: true,
      }}
      onBack={back}
      onCloseKeys={["signInUp"]}
    >
      <div className="flex flex-col items-center justify-center">
        <div className=" flex flex-col justify-center w-full">
          <Register />
        </div>
      </div>
    </ModalLayout>
  );
};

export default WithOutAuth(Up);
