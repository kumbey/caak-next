import { useRouter } from "next/router";
import { useEffect } from "react";
import useScrollBlock from "../../../hooks/useScrollBlock";
import { _objectWithoutKeys } from "../../../utility/Util";

const DefaultModalLayout = ({ children, onCloseKeys, ...props }) => {
  const router = useRouter();
  const type = router.query.signInUp;
  const [blockScroll, allowScroll] = useScrollBlock();

  useEffect(() => {
    blockScroll();
    return () => allowScroll();
  }, [allowScroll, blockScroll]);

  const close = () => {
    if (router.query.prevPath && router.query.prevPath !== router.asPath) {
      router.replace(
        router.query.prevPath,
        undefined,
        { shallow: true, scroll: false }
      );
    } else {
      router.replace("/");
    }
  };

  const switchType = () => {
    if (router.query.prevPath && router.query.prevPath !== router.asPath) {
      router.replace(
        {
          query: {
            ...router.query,
            signInUp: type === "signUp" ? "signIn" : "signUp"
          }
        },
        `/signInUp/${type === "signUp" ? "signIn" : "signUp"}`,
        { shallow: true, scroll: false }
      );
    } else {
      router.replace(`/signInUp/${type === "signUp" ? "signIn" : "signUp"}`);
    }
  };

  return (
    <>
      <div className="popup_modal">
        <div className="popup_modal-content bg-white rounded-lg shadow-xl">
          <div
            onClick={() => close()}
            className="pt-c6 pr-c6 z-5 absolute top-0 right-0"
          >
            <span className="icon-fi-rs-close text-caak-generalblack text-12px bg-caak-titaniumwhite w-c3 h-c3 flex items-center justify-center rounded-full cursor-pointer" />
          </div>
          <div
            className={
              "text-center text-caak-generalblack mb-c2 font-bold text-24px pt-c5 relative"
            }
          >
            {`${type === "signUp" ? "Бүртгүүлэх" : "Нэвтрэх"}`}
          </div>
          {children}
          {/*Footer*/}
          <div
            className={
              "signFooter px-c2 pb-c1 flex self-end justify-between border-t items-center divide-x divide-gray-primary mt-c8 pt-4 divide-opacity-20 text-sm "
            }
          >
            {type === "signUp" ? (
              <div className="text-caak-blue text-15px">
                <span>Бүртгэлтэй хэрэглэгч бол </span>
                <span
                  onClick={switchType}
                  className="text-caak-primary text-15px font-bold cursor-pointer"
                >
                  Нэвтрэх
                </span>
              </div>
            ) : (
              <div className="text-caak-blue text-15px">
                <span>Шинэ хэрэглэгч бол </span>
                <span
                  onClick={switchType}
                  className="text-caak-primary text-15px font-bold cursor-pointer"
                >
                  Бүртгүүлэх
                </span>
              </div>
            )}
            {/* <span className="icon-fi-rs-help text-18px" /> */}
          </div>
        </div>
      </div>
    </>

    // <div className={`overflow-y-auto max-w-[450px] mx-auto relative w-screen h-screen`}>
    //   <div className="popup bg-white rounded-lg shadow-xl">
    //
    //     <div
    //       className={
    //         "text-center text-caak-generalblack mb-c2 font-bold text-24px pt-c5 relative"
    //       }
    //     >
    //       <div
    //           onClick={() => close()}
    //           className="pt-c6 pr-c6 absolute top-0 right-0"
    //       >
    //         <span className="icon-fi-rs-close text-caak-generalblack text-12px bg-caak-titaniumwhite w-c3 h-c3 flex items-center justify-center rounded-full cursor-pointer" />
    //       </div>
    //       {`Шинэ Саак-т ${type === "signUp" ? "бүртгүүлэх!" : "нэвтрэх!"}`}
    //     </div>
    //     {children}
    //     {/*Footer*/}
    //     <div
    //       className={
    //         "signFooter px-c2 mb-c1 flex self-end justify-between border-t items-center divide-x divide-gray-primary mt-c8 pt-4 divide-opacity-20 text-sm "
    //       }
    //     >
    //       {type === "signUp" ? (
    //         <div className="text-caak-blue text-15px">
    //           <span>Бүртгэлтэй хэрэглэгч бол </span>
    //           <span
    //             onClick={switchType}
    //             className="text-caak-primary text-15px font-bold cursor-pointer"
    //           >
    //             Нэвтрэх
    //           </span>
    //         </div>
    //       ) : (
    //         <div className="text-caak-blue text-15px">
    //           <span>Шинэ хэрэглэгч бол </span>
    //           <span
    //             onClick={switchType}
    //             className="text-caak-primary text-15px font-bold cursor-pointer"
    //           >
    //             Бүртгүүлэх
    //           </span>
    //         </div>
    //       )}
    //       <span className="icon-fi-rs-help text-18px" />
    //     </div>
    //   </div>
    // </div>
  );
};

export default DefaultModalLayout;
