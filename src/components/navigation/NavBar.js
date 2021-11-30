import { Fragment, useEffect, useState } from "react";
import Button from "../button";
import SearchInput from "../input/SearchInput";
import DropDown from "./DropDown";
import { getReturnData, useClickOutSide } from "../../utility/Util";
import { useUser } from "../../context/userContext";
import MobileSideMenu from "./MobileSideMenu";
import { useWrapper } from "../../context/wrapperContext";
import API from "@aws-amplify/api";
import { graphqlOperation } from "@aws-amplify/api-graphql";
import { onChangedTotalsBy } from "../../graphql-custom/totals/subscription";
import { getUserTotal } from "../../graphql-custom/totals/queries";
import { getUserAura } from "../../graphql-custom/user/queries";
import NavBarMenu from "./NavBarMenu";
import SubMenu from "./SubMenu";
import useMediaQuery from "./useMeduaQuery";
import { useRouter } from "next/router";
import Logo from "../logo";

export default function NavBar() {
  const [loaded, setLoaded] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const router = useRouter();
  const { user, isLogged } = useUser();

  const [subscripTotal, setSubscripTotal] = useState();
  const subscriptions = {};
  const [userTotal, setUserTotal] = useState({});
  const [render, setRender] = useState(0);
  const { isMobileMenuOpen, setIsMobileMenuOpen } = useWrapper();
  const isTablet = useMediaQuery("(max-width: 767px)");

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const menuRef = useClickOutSide(() => {
    setIsMenuOpen(false);
  });

  // const mobileMenuRef = useClickOutSide(() => {
  //   setIsMobileMenuOpen(false);
  // });

  const fetchUserTotal = async () => {
    try {
      const resp = await API.graphql(
        graphqlOperation(getUserTotal, { user_id: user.id })
      );
      setUserTotal(getReturnData(resp));
    } catch (ex) {
      console.log(ex);
    }
  };

  const fetchUserAura = async () => {
    try {
      let resp = await API.graphql(
        graphqlOperation(getUserAura, { id: user.id })
      );
      resp = getReturnData(resp);
      user.aura = resp.aura;
      setRender(render + 1);
    } catch (ex) {
      console.log(ex);
    }
  };

  const subscrip = () => {
    subscriptions.onChangedTotalsBy = API.graphql({
      query: onChangedTotalsBy,
      variables: {
        type: "UserTotal",
        id: user.id,
      },
    }).subscribe({
      next: (data) => {
        const onData = getReturnData(data, true);
        setSubscripTotal(JSON.parse(onData.totals));
      },
      error: (error) => {
        console.warn(error);
      },
    });
  };

  useEffect(() => {
    if (isLogged) {
      fetchUserTotal();
      subscrip();
    }

    return () => {
      Object.keys(subscriptions).map((key) => {
        subscriptions[key].unsubscribe();
        return true;
      });
    };
    // eslint-disable-next-line
  }, [isLogged]);

  useEffect(() => {
    if (subscripTotal) {
      setUserTotal(subscripTotal);
      fetchUserAura();
    }
    // eslint-disable-next-line
  }, [subscripTotal]);

  useEffect(() => {
    setLoaded(true);
  }, []);

  return loaded && (
    <Fragment>
      {isTablet && (
        <nav
          className={`navbarDesktop z-5 fixed block w-full bg-white shadow-sm`}
        >
          <div className="px-7 sm:px-6 lg:px-c13 flex items-center h-full px-2 py-1">
            <div className="relative flex items-center justify-between w-full h-full">
              <div className={"flex  items-center justify-center"}>
                <Logo />
              </div>
              {/* Mobile menu button */}
              <div className="flex">
                <button
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  className="text-caak-generalblack inline-flex items-center justify-center p-2 rounded-md"
                >
                  <span className="sr-only">Open main menu</span>
                  <span className={"icon-fi-sp-hamburger-menu"} />
                </button>
              </div>
            </div>
          </div>
        </nav>
      )}

      <nav className="navbar border-caak-liquidnitrogen md:border-t-0 z-5 fixed w-full bg-white border-t shadow-sm">
        <div className="flex items-center h-full px-[40px] py-1">
          <div className="relative flex items-center justify-between w-full h-full">
            <div className="md:flex flex flex-row items-center hidden ">
              <Logo onClick={() => router.push("/")} />
            </div>

            <div className="navbarSearch hidden md:block mx-4">
              <SearchInput
                containerStyle={"h-[36px]"}
                hideLabel
                placeholder={"Групп болон пост хайх"}
              />
            </div>

            <div className={"relative flex h-full w-full md:w-auto"}>
              <SubMenu
                params={{
                  userTotal,
                  isMenuOpen,
                  setIsMenuOpen,
                  type: isTablet ? "mobile" : "web",
                }}
              />
              {!isLogged && (
                <div className={"hidden md:flex flex-row items-center"}>
                  <Button
                    round
                    skin={"secondary"}
                    className={"mr-2"}
                    onClick={() =>
                      router.push(
                        `?signInUp=signIn&isModal=true`,
                        `/signInUp/signIn`
                      )
                    }
                    // onClick={() => history.replace({pathname: "/register/confirmation/", state: {background: location, username: "nanoshdee@gmail.c
                  >
                    Нэвтрэх
                  </Button>
                  <Button
                    round
                    skin={"primary"}
                    className={"mr-2"}
                    onClick={() =>
                      router.push(
                        `?signInUp=signUp&isModal=true`,
                        null , {shallow: true}
                      )
                    }
                  >
                    Бүртгүүлэх
                  </Button>
                </div>
              )}

              {!isLogged && !isTablet && (
                <div ref={menuRef} className={"flex items-center relative"}>
                  <div
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    className={
                      "relative flex cursor-pointer justify-center items-center w-px-34 h-px-34 rounded-full bg-caak-liquidnitrogen"
                    }
                  >
                    <span
                      className={
                        "icon-fi-rs-dots text-caak-generalblack text-4px"
                      }
                    />
                    <DropDown
                      className={"top-8 -right-3"}
                      open={isMenuOpen}
                      onToggle={toggleMenu}
                      content={<NavBarMenu />}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        {isTablet && (
          <div
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            // ref={mobileMenuRef}
            className={`block md:hidden w-full flex z-50 bg-transparent justify-end fixed right-0 top-0 transition ease-linear duration-300 ${
              isMobileMenuOpen
                ? "transform translate-x-0"
                : "transform translate-x-full"
            }`}
            id="mobile-menu"
          >
            <MobileSideMenu setOpen={setIsMobileMenuOpen} />
          </div>
        )}
      </nav>
    </Fragment>
  );
}
