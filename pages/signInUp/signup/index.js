import useModalLayout from "../../../src/hooks/useModalLayout";
import Button from "../../../src/components/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-regular-svg-icons";
import {
  faFacebook,
  faGoogle,
  faTwitter,
  faApple,
} from "@fortawesome/free-brands-svg-icons";

const SignIn = ({ type }) => {
  const ModalLayout = useModalLayout();
  console.log("Sign Up page");

  return (
    <ModalLayout
      className={"flex justify-center items-center"}
      // title={`Шинэ Саак-т ${type === "signUp" ? "бүртгүүлэх!" : "нэвтрэх!"}`}
    >
      <div
        className={
          "flex text-caak-generalblack justify-center mb-c2 font-bold text-24px pt-c5 "
        }
      >
        Бүртгүүлэх
      </div>
      {/*Social Buttons*/}
      <div className={"flex flex-col items-center"}>
        <Button
          onClick={() => {}}
          round
          className={
            "hover:bg-gray-100 border border-gray-200  w-80 h-11 font-bold mb-2.5  rounded-md text-caak-generalblack text-16px bg-white relative"
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
          onClick={() => {}}
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
          onClick={() => {}}
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
            "hover:bg-gray-100 border border-gray-200 w-80 h-11   font-bold mb-2.5 rounded-md text-caak-generalblack text-16px bg-white relative"
          }
        >
          <div className="px-16">
            <FontAwesomeIcon
              size={"lg"}
              className={"text-caak-twitter absolute left-c1"}
              icon={faTwitter}
            />
            Twitter
          </div>
        </Button>
        <Button
          onClick={() => null}
          round
          className={
            "hover:bg-gray-100 border border-gray-200 w-80 h-11   font-bold mb-2.5 rounded-md text-caak-generalblack text-16px bg-white relative"
          }
        >
          <div className="px-16">
            <FontAwesomeIcon
              size={"lg"}
              className={"text-caak-apple absolute left-c1"}
              icon={faApple}
            />
            Apple
          </div>
        </Button>
      </div>

      {/*Footer*/}
      <div
        className={
          "signFooter px-c2 mb-c1 flex self-end justify-between border-t items-center divide-x divide-gray-primary mt-c8 pt-4 divide-opacity-20 text-sm "
        }
      >
        <div className=" text-caak-blue text-15px">
          <span>Шинэ хэрэглэгч бол </span>
          <span
            onClick={() => {}}
            className="text-caak-primary text-15px font-bold cursor-pointer"
          >
            {" "}
            Бүртгүүлэх
          </span>
        </div>
        <span className="icon-fi-rs-help text-18px" />
      </div>
    </ModalLayout>
  );
};

export default SignIn;
