import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faGoogle,
  faTwitter,
  faApple,
} from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-regular-svg-icons";
import { closeModal } from "../../src/utility/Util";
import Button from "../../src/components/button";
import { isLogged } from "../../src/utility/Authenty";
import { useUser } from "../../src/context/userContext";
import useModalLayout from "../../src/hooks/useModalLayout";
import { useRouter } from "next/router";
import WithOutAuth from "../../src/middleware/auth/WithOutAuth";

const SignInUp = ({ ...props }) => {
  console.log(props);
  const ModalLayout = useModalLayout();
  const router = useRouter();
  const type = router.query.signInUp;

  const host = "/federated/login/";
  const windowName = "_blank";
  const { user, setUser } = useUser();

  const openWindow = (type) => {
    const opened = window.open(host + type, windowName);
    const timer = setInterval(function () {
      if (opened.closed) {
        clearInterval(timer);
        isLogged(user, setUser);
        closeModal(history, state);
      }
    }, 100);
  };
  console.log(type);
  return (
    <ModalLayout type={type} className={"flex justify-center items-center"}>
      {/*Social Buttons*/}
      <div className={"flex flex-col items-center px-c13 "}>
        <Button
          onClick={() => {
            type === "signUp"
              ? router.replace(
                  `?signInUp=stepUp&isModal=true`,
                  `/signInUp/stepUp`
                )
              : router.replace(
                  `?signInUp=stepIn&isModal=true`,
                  `/signInUp/stepIn`
                );
          }}
          round
          className={
            "hover:bg-gray-100 border border-gray-200  w-80 h-11 font-bold rounded-md  mb-2.5 text-caak-generalblack text-16px bg-white relative"
          }
        >
          <FontAwesomeIcon
            size={"lg"}
            className={"text-caak-generalblack absolute left-c1"}
            icon={faEnvelope}
          />
          Имэйл хаяг / Утасны дугаар
        </Button>
        <Button
          onClick={() => openWindow("facebook")}
          round
          className={
            "hover:bg-gray-100 border border-gray-200 w-80 h-11   font-bold mb-2.5 rounded-md text-caak-generalblack text-16px bg-white relative"
          }
        >
          <FontAwesomeIcon
            size={"lg"}
            className={"text-caak-facebook absolute left-c1"}
            icon={faFacebook}
          />
          Facebook
        </Button>
        <Button
          onClick={() => openWindow("google")}
          round
          className={
            "hover:bg-gray-100 border border-gray-200 w-80 h-11  font-bold mb-2.5 rounded-lg text-caak-generalblack text-16px bg-white relative"
          }
        >
          <FontAwesomeIcon
            size={"lg"}
            className={"text-caak-primary absolute left-c1"}
            icon={faGoogle}
          />
          <p className="">Google</p>
        </Button>

        <Button
          onClick={() => null}
          round
          className={
            "hover:bg-gray-100 border border-gray-200 w-80 h-11  font-bold mb-2.5 rounded-lg text-caak-generalblack text-16px bg-white relative"
          }
        >
          <div className="px-16">
            <FontAwesomeIcon
              size={"lg"}
              className={"text-caak-twitter absolute left-c1"}
              icon={faTwitter}
            />
            <p className="">Twitter</p>
          </div>
        </Button>
        <Button
          onClick={() => null}
          round
          className={
            "hover:bg-gray-100 border border-gray-200 w-80 h-11  font-bold mb-2.5 rounded-lg text-caak-generalblack text-16px bg-white relative"
          }
        >
          <div className="px-16">
            <FontAwesomeIcon
              size={"lg"}
              className={"text-caak-generalblack absolute left-c1"}
              icon={faApple}
            />
            <p className="">Apple</p>
          </div>
        </Button>
      </div>
    </ModalLayout>
  );
};

export default WithOutAuth(SignInUp);
