import { useRouter } from "next/router";
import { useEffect } from "react";
import useScrollBlock from "../../../hooks/useScrollBlock";
import { _modalisOpen } from "../../../utility/Util";

const DefaultModalLayout = ({ children, ...props }) => {
  const router = useRouter();
  const type = router.query.signInUp;
  const [blockScroll, allowScroll] = useScrollBlock();

  useEffect(() => {
    blockScroll();
    return () => allowScroll();
  }, [allowScroll, blockScroll]);

  const close = () => {
    router.replace(router.pathname, undefined, {shallow: true});
  };

  return (
    <div className={`backdrop ${props.className}`}>
      <div className="popup absolute bg-white rounded-lg shadow-xl">
        <div
          onClick={() => close()}
          className="pt-c6 pr-c6 absolute top-0 right-0"
        >
          <span className="icon-fi-rs-close text-caak-generalblack text-12px bg-caak-titaniumwhite w-c3 h-c3 flex items-center justify-center rounded-full cursor-pointer" />
        </div>
        <div
          className={
            "text-center text-caak-generalblack mb-c2 font-bold text-24px pt-c5 "
          }
        >
          {`Шинэ Саак-т ${type === "signUp" ? "бүртгүүлэх!" : "нэвтрэх!"}`}
        </div>
        {children}
        {/*Footer*/}
        <div
          className={
            "signFooter px-c2 mb-c1 flex self-end justify-between border-t items-center divide-x divide-gray-primary mt-c8 pt-4 divide-opacity-20 text-sm "
          }
        >
          {type === "signUp" ? (
            <div className="text-caak-blue text-15px">
              <span>Бүртгэлтэй хэрэглэгч бол </span>
              <span
                onClick={() =>
                  router.replace(
                    `?signInUp=signIn&isModal=true`,
                    `/signInUp/signIn`
                  )
                }
                className="text-caak-primary text-15px font-bold cursor-pointer"
              >
                Нэвтрэх
              </span>
            </div>
          ) : (
            <div className="text-caak-blue text-15px">
              <span>Шинэ хэрэглэгч бол </span>
              <span
                onClick={() =>
                  router.replace(
                    `?signInUp=signUp&isModal=true`,
                    `/signInUp/signUp`
                  )
                }
                className="text-caak-primary text-15px font-bold cursor-pointer"
              >
                Бүртгүүлэх
              </span>
            </div>
          )}
          <span className="icon-fi-rs-help text-18px" />
        </div>
      </div>
    </div>
  );
};

export default DefaultModalLayout;
