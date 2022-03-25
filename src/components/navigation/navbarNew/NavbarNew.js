import { useEffect, useState } from "react";
import Logo from "../../logo";
import Button from "../../button";
import { useRouter } from "next/router";
import { useUser } from "../../../context/userContext";
import { useWrapper } from "../../../context/wrapperContext";
import MenuItems from "./MenuItems";
import useMediaQuery from "../useMeduaQuery";
import MobileSideMenu from "../MobileSideMenu";

export default function NavbarNew() {
  const [loaded, setLoaded] = useState(false);
  const router = useRouter();
  const { isLogged } = useUser();
  const { isMobileMenuOpen, setIsMobileMenuOpen, navBarTransparent } =
    useWrapper();
  const isLaptop = useMediaQuery("screen and (max-device-width: 1100px)");
  const isTablet = useMediaQuery("(max-width: 767px)");

  useEffect(() => {
    setLoaded(true);
  }, []);

  return (
    loaded && (
      <nav
        className={`${
          navBarTransparent ? "bg-transparent" : "bg-white"
        } w-full px-[40px] py-[18.44px] h-[80px]`}
      >
        <div
          className={"h-[42.33px] flex flex-row items-center justify-between"}
        >
          <div className={"flex flex-row items-center"}>
            {/*Mobile Menu Icon*/}
            {isLaptop && (
              <div
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                // ref={mobileMenuRef}
                className={`block md:hidden w-full flex z-50 bg-transparent justify-start fixed left-0 top-0 transition ease-linear duration-300 ${
                  isMobileMenuOpen
                    ? "transform translate-x-0"
                    : "transform -translate-x-full"
                }`}
                id="mobile-menu"
              >
                <MobileSideMenu setOpen={setIsMobileMenuOpen} />
              </div>
            )}
            {isLaptop && (
              <div
                onClick={() => setIsMobileMenuOpen(true)}
                className={
                  "mr-[30px] cursor-pointer w-[24px] h-[24px] flex items-center justify-center"
                }
              >
                <span
                  className={
                    "iconNew-fi-rs-hamburger-menu text-[22px] text-white"
                  }
                />
              </div>
            )}

            <Logo />
            {!isLaptop && <MenuItems />}
          </div>
          <div className={"flex flex-row items-center"}>
            <div
              className={`${
                isTablet ? "mr-0" : "mr-[22px]"
              } flex w-[22px] h-[22px] items-center justify-center cursor-pointer`}
            >
              <span className={"iconNew-fi-rs-search text-white text-[22px]"} />
            </div>

            {isLogged && (
              <div className={"hidden md:flex flex-row items-center"}>
                <Button
                  round
                  skin={"secondary"}
                  className={
                    "mr-[12px] h-[34px] font-roboto rounded-[4px] text-[15px] font-bold text-white bg-transparent border-[1px] border-white"
                  }
                  onClick={() => {
                    router.replace(
                      {
                        query: {
                          ...router.query,
                          prevPath: router.asPath,
                          signInUp: "signIn",
                          isModal: true,
                        },
                      },
                      `/signInUp/signIn`,
                      { shallow: true }
                    );
                  }}
                >
                  Нэвтрэх
                </Button>
                <Button
                  round
                  skin={"primary"}
                  className={
                    "h-[34px] font-roboto rounded-[4px] rounded-[4px] text-[15px] font-bold text-white"
                  }
                  onClick={() =>
                    router.replace(
                      {
                        pathname: router.pathname,
                        query: {
                          ...router.query,
                          prevPath: router.asPath,
                          signInUp: "signUp",
                          isModal: true,
                        },
                      },
                      `/signInUp/signUp`,
                      { shallow: true, scroll: false }
                    )
                  }
                >
                  Бүртгүүлэх
                </Button>
              </div>
            )}
          </div>
        </div>
      </nav>
    )
  );
}
