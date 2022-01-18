import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
} from "@fortawesome/free-brands-svg-icons";
import googleImg from "../../public/assets/images/Google-Color.svg";
import { faEnvelope } from "@fortawesome/free-regular-svg-icons";
import Button from "../../src/components/button";
import { useUser } from "../../src/context/userContext";
import useModalLayout from "../../src/hooks/useModalLayout";
import { useRouter } from "next/router";
import WithOutAuth from "../../src/middleware/auth/WithOutAuth";
import Link from "next/link";
import { useState } from "react";
import Consts from "../../src/utility/Consts";
import Validate from '../../src/utility/Validate'
import Input from "../../src/components/input";
import { Auth } from "aws-amplify";
import { checkUsername, _objectWithoutKeys } from "../../src/utility/Util";

const SignInUp = () => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const ModalLayout = useModalLayout();
  const router = useRouter();
  const type = router.query.signInUp;

  const host = "/signInUp/federated/";
  const windowName = "_blank";
  const { isLoginValid } = useUser();

  const validate = {
    username: {
      value: username,
      type: Consts.typeName,
      onChange: setUsername,
      ignoreOn: true,
    },
    password: {
      value: password,
      type: Consts.typePassword,
      onChange: setPassword,
      // ignoreOn: true,
    },
  };

  const { handleChange, errors, setErrors, handleSubmit } = Validate(validate);

  async function doSignIn() {
    try {
      setLoading(true);
      await Auth.signIn(checkUsername(username), password);
      if (router.query.prevPath && router.query.prevPath !== router.asPath) {
        router.replace(router.query.prevPath, undefined, {
          shallow: false,
          scroll: false,
        });
      } else {
        router.replace("/");
      }
      setLoading(false);
    } catch (ex) {
      setLoading(false);
      if (ex.code === "NotAuthorizedException") {
        setError("Нэвтрэх нэр эсвэл нууц үг буруу байна");
      } else if (ex.code === "UserNotFoundException") {
        setError("Бүртгэлтэй хэрэглэгч олдсонгүй");
      }
    }
  }

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
        {/* <Button
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
        </Button> */}
        
      {
        type === "signIn" && (
          <form onSubmit={(e) => e.preventDefault()}>
        <div>
          <p className="error ">{error}</p>
          <Input
            name={"username"}
            type={"text"}
            errorMessage={errors.username}
            onChange={handleChange}
            placeholder={"Имэйл хаяг/Утасны дугаар"}
            className={
              "border border-caak-titaniumwhite bg-caak-liquidnitrogen hover:bg-white h-[44px] mt-2"
            }
          />
          <Input
            name={"password"}
            type={"password"}
            errorMessage={errors.password}
            onChange={handleChange}
            placeholder={"Нууц үг"}
            className={
              "border border-caak-titaniumwhite w-80 bg-caak-liquidnitrogen hover:bg-white h-[44px] mt-2"
            }
          />
          <div
            className="text-caak-bleudefrance text-14px"
            onClick={() =>
              router.push(
                {
                  query: {
                    ...router.query,
                    signInUp: "forgotpassword",
                  },
                },
                `/signInUp/forgotpassword`,
                { shallow: true, scroll: false }
              )
            }
          >
            <span className="ml- cursor-pointer border-b border-caak-bleudefrance border-dashed">
              Нууц үгээ мартсан уу?
            </span>
          </div>
        </div>
        <div className="text-white text-14px flex flex-col items-center justify-between mt-5">
          <Button
            loading={loading}
            onClick={() => handleSubmit(doSignIn)}
            className={
              "rounded-md w-80 h-c9 text-16px font-medium font-inter bg-caak-primary"
            }
          >
            Нэвтрэх
          </Button>
        </div>
        <p className="text-[14px] text-[#AFAFAF] my-[14px] md:my-[24px] text-center">Эсвэл</p>
        </form>
        )
      }
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
            "flex justify-between hover:bg-gray-100 border border-gray-200 w-80 h-11  font-medium font-inter rounded-lg text-caak-generalblack text-16px bg-white relative"
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
      <div className="flex flex-col items-center px-c13 ">
        <p className="text-[14px] text-[#AFAFAF] my-[14px] md:my-[24px] text-center">Эсвэл</p>
        <Button
          onClick={goNext}
          round
          className={
            "hover:bg-gray-100 border border-gray-200 w-80 h-11 font-medium font-inter rounded-md  mb-2.5 text-caak-generalblack text-16px bg-white relative"
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
      
        <p className="text-center mt-[24px]  font-inter font-normal text-13px text-caak-aleutian">
          Та энэ алхамын үргэлжлүүлснээр, сайтын{" "}
          <Link
            as={'/help/secure'}
            href={{
              pathname: "/help/secure",
              query: {
                index: 1,
              }
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
            as={'/help/secure'}
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
      
      </div>)}
    </ModalLayout>
  );
};

export default WithOutAuth(SignInUp);
