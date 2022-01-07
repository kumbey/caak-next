import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faApple,
  faFacebook,
  faGoogle,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import googleImg from "../../public/assets/images/Google-Color.svg";
import { faEnvelope } from "@fortawesome/free-regular-svg-icons";
import Button from "../../src/components/button";
import { useUser } from "../../src/context/userContext";
import useModalLayout from "../../src/hooks/useModalLayout";
import { useRouter } from "next/router";
import WithOutAuth from "../../src/middleware/auth/WithOutAuth";
import Image from "next/image";
import Link from "next/link";

const SignInUp = () => {
  const ModalLayout = useModalLayout();
  const router = useRouter();
  const type = router.query.signInUp;

  const host = "/signInUp/federated/";
  const windowName = "_blank";
  const { isLoginValid } = useUser();

  const openWindow = (type) => {
    const opened = window.open(host + type, windowName);
    const timer = setInterval(function () {
      if (opened.closed) {
        isLoginValid();
        clearInterval(timer);
      }
    }, 100);
  };

  const goNext = () => {
    if (router.query.isModal) {
      router.replace(
        {
          query: {
            ...router.query,
            signInUp: type === "signIn" ? "in" : "up",
          },
        },
        type === "signIn" ? "/signInUp/in" : "/signInUp/up",
        { shallow: true }
      );
    } else {
      router.replace(
        type === "signIn" ? "/signInUp/in" : "/signInUp/up",
        undefined,
        { shallow: true, scroll: false }
      );
    }
  };

  return (
    <ModalLayout
      type={type}
      onCloseKeys={["signInUp"]}
      className={"flex justify-center items-center"}
    >
      {/*Social Buttons*/}
      <div className={"flex flex-col items-center px-c13 "}>
        <Button
          onClick={goNext}
          round
          className={
            "hover:bg-gray-100 border border-gray-200  w-80 h-11 font-medium font-inter rounded-md  mb-2.5 text-caak-generalblack text-16px bg-white relative"
          }
        >
          <div className=" relative border-r border-caak-titaniumwhite w-[30px] h-[20px] mr-4">
            <FontAwesomeIcon
              size={"lg"}
              className={"text-caak-generalblack absolute right-4 top-0 "}
              icon={faEnvelope}
            />
          </div>
          Имэйл хаяг/Утасны дугаар
        </Button>
        <Button
          onClick={() => openWindow("facebook")}
          round
          className={
            "flex justify-between hover:bg-gray-100 border border-gray-200 w-80 h-11   font-medium font-inter mb-2.5 rounded-md text-caak-generalblack text-16px bg-white relative g"
          }
        >
          <div className=" relative border-r border-caak-titaniumwhite w-[30px] h-[20px] mr-4">
            <FontAwesomeIcon
              size={"lg"}
              className={"text-caak-facebook absolute right-4 top-0"}
              icon={faFacebook}
            />
          </div>
          <p>Facebook</p>
          <p className="w-[40px]"></p>
        </Button>
        <Button
          onClick={() => openWindow("google")}
          round
          className={
            "flex justify-between hover:bg-gray-100 border border-gray-200 w-80 h-11  font-medium font-inter mb-2.5 rounded-lg text-caak-generalblack text-16px bg-white relative"
          }
        >
          <div className=" relative border-r border-caak-titaniumwhite w-[30px] h-[20px] mr-4">
            {/* <FontAwesomeIcon
              size={"lg"}
              className={"text-caak-primary absolute right-4 top-0"}
              icon={faGoogle}
            /> */}
            <div className="absolute right-4 top-0 w-[24px] h-[24px]">
              <img
                className={"object-cover"}
                alt=""
                src={googleImg.src}
                height={24}
                width={24}
                // objectFit="cover"
              />
            </div>
          </div>
          <p className="">Google</p>
          <p className="w-[40px]"></p>
        </Button>

        {/* <Button
          onClick={() => null}
          round
          className={
            "flex justify-between hover:bg-gray-100 border border-gray-200 w-80 h-11  font-medium font-inter mb-2.5 rounded-lg text-caak-generalblack text-16px bg-white relative"
          }
        >
          <div className=" relative border-r border-caak-titaniumwhite w-[30px] h-[20px] mr-4">
            <FontAwesomeIcon
              size={"lg"}
              className={"text-caak-twitter absolute right-4 top-0"}
              icon={faTwitter}
            />
          </div>
          <p className="">Twitter</p>
          <p className="w-[40px]"></p>
        </Button>
        <Button
          onClick={() => null}
          round
          className={
            "flex justify-between hover:bg-gray-100 border border-gray-200 w-80 h-11  font-medium font-inter mb-2.5 rounded-lg text-caak-generalblack text-16px bg-white relative"
          }
        >
          <div className=" relative border-r border-caak-titaniumwhite w-[30px] h-[20px] mr-4">
            <FontAwesomeIcon
              size={"lg"}
              className={"text-caak-generalblack absolute right-4 top-0"}
              icon={faApple}
            />
          </div>
          <p className="">Apple</p>
          <p className="w-[40px]"></p>
        </Button> */}
      </div>
      {type === "signUp" && (
        <p className="mx-[25px] text-center mt-[34px]  font-inter font-normal text-13px text-caak-aleutian">
          Та энэ алхамын үргэлжлүүлснээр, сайтын{" "}
          <Link
            href={{
              pathname: "/help/secure",
              query: {
                index: 1,
              },
            }}
            shallow
          >
            <a>
              <span className="text-caak-generalblack">
                Үйлчилгээний нөхцөл
              </span>{" "}
            </a>
          </Link>
          болон{" "}
          <Link
            href={{
              pathname: "/help/secure",
              query: {
                index: 2,
              },
            }}
            shallow
          >
            <a>
              <span className="text-caak-generalblack">Нууцлалын бодлогыг</span>{" "}
            </a>
          </Link>
          зөвшөөрсөнд тооцно.
        </p>
      )}
    </ModalLayout>
  );
};

export default WithOutAuth(SignInUp);
