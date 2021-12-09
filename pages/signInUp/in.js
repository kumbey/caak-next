import useModalLayout from "/src/hooks/useModalLayout";
import { useState, useEffect } from "react";

import Login from "../../src/components/login/login";
import WithOutAuth from "../../src/middleware/auth/WithOutAuth";
import { useRouter } from "next/router";

const In = ({ ...props }) => {

  const router = useRouter()
  const query = router.query

  const ModalLayout = useModalLayout({ layoutName: "step" });

  const back = () => {
    if(query.isModal){
      router.replace({
        pathname: router.pathname,
        query: {
          ...query,
          signInUp: "signIn"
        }
      }, "/signInUp/signIn", {shallow : true, scroll: false})
    }else{
      router.replace("/signInUp/signIn", undefined, {shallow : true, scroll: false})
    }
  }

  return (
    <ModalLayout
      maxStep={1}
      activeStep={1}
      className={"flex justify-center items-center"}
      configure={{
        back: true,
        footer: true,
        hideCount: true,
        hideProgress: true
      }}
      onBack={back}
      onCloseKeys={["signInUp"]}
    >
      <div className="flex flex-col items-center justify-center">
        <div className=" flex flex-col justify-center w-full">
          <Login />
        </div>
      </div>
    </ModalLayout>
  );
};

export default WithOutAuth(In);
