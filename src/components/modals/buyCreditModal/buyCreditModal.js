import useModalLayout from "../../../hooks/useModalLayout";
import Bank from "./bank";
import golomt from "/public/assets/images/bankLogos/Golomt.png";
import khan from "/public/assets/images/bankLogos/khanbank.png";
import tdb from "/public/assets/images/bankLogos/tdbblue.png";
import React, { useEffect, useState } from "react";
import Button from "../../button";
import useScrollBlock from "../../../hooks/useScrollBlock";
import { API, input } from "aws-amplify";
import { createAccouningtRequest } from "../../../graphql-custom/accountingRequest/mutation";
import { useUser } from "../../../context/userContext";
import { graphqlOperation } from "@aws-amplify/api-graphql";
import toast from "react-hot-toast";
import { numberWithCommas } from "../../../utility/Util";
import { useRouter } from "next/router";

const BuyCreditModal = ({ setIsBoostModalOpen, data, customAmount }) => {
  const [selectedBankId, setSelectedBankId] = useState(0);
  const [phoneNumberError, setPhoneNumberError] = useState(null);
  const BuyCreditModalLayout = useModalLayout({ layoutName: "boostModal" });
  const [blockScroll, allowScroll] = useScrollBlock();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [loading, setLoading] = useState(false);
  const [isConfirmationModal, setIsConfirmationModal] = useState(false);
  const [confirmedModalOpen, setConfirmedModalOpen] = useState(false);
  const { user, isLogged } = useUser();
  const router = useRouter();
  const days = Math.floor(customAmount / 5000);

  const banks = [
    {
      id: 0,
      logo: khan,
      name: "Хаан Банк",
      accountNumber: 5212062121,
    },
    {
      id: 1,
      logo: tdb,
      name: "Худалдаа Хөгжлийн Банк",
      accountNumber: 464007506,
    },
    {
      id: 2,
      logo: golomt,
      name: "Голомт Банк",
      accountNumber: 1410005680,
    },
  ];

  const createAccountingRequest = async () => {
    if (selectedBankId === null) {
      return toast.error("Та шилжүүлэх банкаа сонгоно уу.");
    } else if (!phoneNumber) {
      return toast.error("Та утасны дугаараа оруулна уу.");
    }
    setLoading(true);
    if (isLogged) {
      try {
        await API.graphql(
          graphqlOperation(createAccouningtRequest, {
            input: {
              user_id: user.id,
              status: "REQUESTED",
              userStatus: `${user.id}#REQUESTED`,
              pack:
                data.type === "CUSTOM"
                  ? `custom${customAmount / 1000}`
                  : data.code,
              phoneNumber: phoneNumber,
              meta: JSON.stringify([
                {
                  action: "REQUESTED",
                  amount: customAmount ? customAmount : data.price,
                  date: new Date().toISOString(),
                  requested_user_id: user.id,
                  bank: {
                    name: banks[selectedBankId].name,
                    account_number: banks[selectedBankId].accountNumber,
                  },
                },
              ]),
            },
          })
        );
      } catch (ex) {
        console.log(ex);
      }
    } else {
      router.push(
        {
          pathname: router.pathname,
          query: {
            ...router.query,
            signInUp: "signIn",
            isModal: true,
            prevPath: router.asPath,
          },
        },
        `/signInUp/signIn`,
        { shallow: true }
      );
    }
    setLoading(false);
  };

  useEffect(() => {
    blockScroll();
    return () => allowScroll();
  }, [allowScroll, blockScroll]);
  return (
    <BuyCreditModalLayout
      setIsOpen={setIsBoostModalOpen}
      headerTitle={"Данс цэнэглэх"}
    >
      <div
        className={"flex flex-col lg:flex-row py-[40px] px-[5px] sm:px-[40px]"}
      >
        <div
          className={
            "flex flex-col max-w-[590px] w-full px-[24px] py-[22px] bg-white rounded-[8px] shadow-card"
          }
        >
          <p
            className={
              "font-semibold text-[18px] text-caak-generalBlack tracking-[0.27px] leading-[21px]"
            }
          >
            Гүйлгээ хийх Банкаа сонгоно уу
          </p>
          <div className={"flex flex-row items-center mt-[20px]"}>
            {banks.map((bank, index) => (
              <Bank
                key={index}
                index={index}
                setSelected={setSelectedBankId}
                selected={selectedBankId === index}
                logo={bank.logo}
                name={bank.name}
              />
            ))}
          </div>
          <p
            className={
              "text-caak-generalblack text-[14px] font-medium tracking-[0.21px] leading-[28px] mt-[20px]"
            }
          >
            Дансны мэдээлэл
          </p>
          <div
            className={
              "flex flex-col p-[16px] justify-center bg-caak-extraLight rounded-[8px] min-h-[99px] max-w-[542px] mt-[12px]"
            }
          >
            <div className={"flex flex-row items-center"}>
              <p
                className={
                  "text-caak-generalblack text-[15px] font-semibold tracking-[0px]"
                }
              >
                Хүлээн авагчийн нэр:&nbsp;
              </p>
              <p className={"text-caak-generalblack text-[15px]"}>
                Саак Холдинг ХХК
              </p>
            </div>
            <div className={"flex flex-row items-center"}>
              <p className={"text-caak-generalblack text-[15px] font-semibold"}>
                Дансны код:&nbsp;
              </p>
              <p className={"text-caak-generalblack text-[15px]"}>
                {banks[selectedBankId]?.accountNumber}
              </p>
            </div>
            <div className={"flex flex-row items-center"}>
              <p className={"text-caak-generalblack text-[15px] font-semibold"}>
                Шилжүүлэх мөнгөн дүн:&nbsp;
              </p>
              <p className={"text-caak-generalblack text-[15px]"}>
                {numberWithCommas(
                  data.id === 0 ? customAmount : data.price,
                  "."
                )}
                ₮
              </p>
            </div>
          </div>
          <p
            className={
              "text-caak-generalblack text-[14px] font-medium tracking-[0.21px] leading-[28px] mt-[20px]"
            }
          >
            Таны утасны дугаар
          </p>
          <input
            pattern="[0-9]+"
            value={phoneNumber}
            onChange={(e) => {
              if (!e.target.value) {
                setPhoneNumberError("Та утасны дугаараа оруулна уу");
              } else {
                setPhoneNumberError(null);
              }
              setPhoneNumber(
                e.target.value
                  .replace(/[^0-9.]/g, "")
                  .replace(/(\..*?)\..*/g, "$1")
              );
            }}
            required
            type={"tel"}
            maxLength={8}
            className={`${
              phoneNumberError
                ? "border-caak-primary focus:border-caak-primary"
                : "focus:outline-none border-[#E4E4E5] focus:border-blue-600"
            } invalid:text-caak-primary text-[15px] tracking-[0.23px] leading-[18px] text-caak-generalblack w-full h-[44px] p-[14px] rounded-[8px] border-[1px]`}
          />
          {phoneNumberError ? (
            <p className={"text-caak-primary text-[12px]"}>
              {phoneNumberError}
            </p>
          ) : null}
          <p
            className={
              "text-caak-generalblack text-[14px] font-medium tracking-[0.21px] leading-[28px] mt-[20px]"
            }
          >
            Гүйлгээний утга
          </p>
          <div
            className={
              "flex flex-row p-[16px] rounded-[8px] bg-caak-extraLight min-h-[51px] h-full max-w-[542px] w-full"
            }
          >
            <div
              className={
                "flex items-center justify-center w-max rounded-[4px] bg-[#9A9FB4] h-[23px] px-[18px] py-[2px] mr-[6px]"
              }
            >
              <p
                className={
                  "text-[15px] text-white font-medium leading-[24px] tracking-0px]"
                }
              >
                {data.type === "CUSTOM"
                  ? `custom${Math.floor(customAmount / 1000)}`
                  : data.code}
              </p>
            </div>
            <div
              className={
                "flex items-center justify-center w-max rounded-[4px] bg-[#9A9FB4] h-[23px] px-[18px] py-[2px]"
              }
            >
              <p
                className={
                  "text-[15px] text-white font-medium leading-[24px] tracking-0px]"
                }
              >
                {phoneNumber ? phoneNumber : " Таны утасны дугаар"}
              </p>
            </div>
          </div>
          <div className={"flex flex-col mt-[14px]"}>
            <div
              className={
                "flex flex-row items-center text-caak-generalblack text-[15px] leading-[24px]"
              }
            >
              <p className={"font-medium"}>Багцын код:&nbsp;</p>
              <p>
                {data.type === "CUSTOM"
                  ? `custom${Math.floor(customAmount / 1000)}`
                  : data.code}
              </p>
            </div>
            <div
              className={
                "flex flex-row items-center text-caak-generalblack text-[15px] leading-[24px]"
              }
            >
              <p className={"font-medium"}>Таны утасны дугаар:&nbsp;</p>
              <p>{phoneNumber}</p>
            </div>
          </div>
          <div
            className={
              "px-[20px] py-[15px] rounded-[8px] min-h-[72px] w-full max-w-[542px] bg-[#E60033] mt-[30px] bg-opacity-5"
            }
          >
            <div className={"flex flex-row items-center"}>
              <div
                className={
                  "self-start flex items-center justify-center w-[24px] h-[24px] mr-[8px]"
                }
              >
                <span
                  className={"icon-fi-rs-danger text-[#E60033] text-[22px]"}
                />
              </div>
              <p
                className={
                  "text-[#E60033] text-[14px] font-medium tracking-[0.35px] leading-[18px]"
                }
              >
                Төлбөрөө шилжүүлсний дараа &quot;хүсэлт илгээх&quot; товчыг
                дарснаар 30 минутын дотор таны данс цэнэглэгдэх болно.
              </p>
            </div>
          </div>

          <Button
            loading={loading}
            disabled={selectedBankId === null}
            onClick={() => phoneNumber.length > 7 ? setIsConfirmationModal(true) : setPhoneNumberError('Та утасны дугаараа оруулна уу')}
            skin={"primary"}
            className={
              "w-full mt-[14px] h-[44px] text-[16px] tracking-[0.24px] leading-[20px] font-medium"
            }
          >
            Хүсэлт илгээх
          </Button>
        </div>
        <div
          className={
            "rounded-[8px] bg-white mt-[22px] lg:mt-0 ml-0 lg:ml-[22px] h-[fit-content] min-w-[320px] w-full max-w-[400px] shadow-card"
          }
        >
          <div
            className={
              "rounded-t-[8px] bg-white p-[16px] border-b-[1px] border-caak-titaniumwhite"
            }
          >
            <p
              className={
                "text-[18px] text-caak-generalblack font-semibold tracking-[0.27px] leading-[21px]"
              }
            >
              Таны сонгосон багц
            </p>
          </div>
          <div className={"px-[16px] py-[14px]"}>
            <div
              className={
                "flex flex-col items-center p-[20px] rounded-[8px] bg-caak-extraLight max-w-[368px] h-full w-full min-h-[222px] h-full"
              }
            >
              <span
                className={`${data.textColor} font-semibold text-[18px] tracking-[0.27px] leading-[28px]`}
              >
                {data.title}&nbsp;
                <span
                  className={
                    "text-caak-generalblack font-semibold text-[18px] tracking-[0.27px] leading-[28px]"
                  }
                >
                  багц
                </span>
              </span>
              <p
                className={
                  "text-[30px] tracking-[0.30px] leading-[28px] font-bold mt-[16px] text-[#21293C]"
                }
              >
                {numberWithCommas(
                  data.id === 0 ? customAmount : data.price,
                  "."
                )}
                ₮
              </p>
              <p className="text-[#5D636B] text-[16px] font-medium mt-[10px]">
              {
                Math.floor((data?.price + data?.bonus) / 5000) >= 30 ? 
                Math.floor((data?.price + data?.bonus) / 3500) :
                Math.floor((data?.price + data?.bonus) / 5000) >= 20 ? 
                Math.floor((data?.price + data?.bonus) / 4000) :
                Math.floor((data?.price + data?.bonus) / 5000) >= 14 ? 
                Math.floor((data?.price + data?.bonus) / 4500) :
                Math.floor((data?.price + data?.bonus) / 5000)
              }{" "}
                хоног
              </p>
              <div className="w-full">
                <p className="text-[#2B3A4C] font-medium text-[15px]">
                  Нэмэлт бонус
                </p>
                <p className="bg-white h-[42px] w-full rounded-[8px] flex items-center justify-center text-[#257CEE] text-[15px] mt-[10px]">
                  + {numberWithCommas(data.bonus, ",")}₮
                </p>
              </div>
            </div>
          </div>
        </div>
        {isConfirmationModal && (
          <div className="popup_modal">
            <div className="popup_modal-content w-full min-h-[259] sm:min-w-[500px] rounded-[12px] flex flex-col items-center px-[50px] pb-[30px]">
              <span className="icon-fi-rs-help-thick text-[#EFAA00] text-[24px] p-[12px] bg-[#EFAA00] bg-opacity-10 rounded-full mt-[40px]" />
              <p className="text-[18px] font-semibold text-[#21293C] mt-[10px]">
                Та төлбөрөө шилжүүлсэн үү?
              </p>
              <p className="text-center text-[#6C7392] text-[15px] mt-[14px]">
                Төлбөрөө шилжүүлсний дараа 30 минутын дотор таны данс
                цэнэглэгдэх болно.
              </p>
              <div className="flex flex-row items-center justify-center w-full mt-[24px]">
                <p
                  onClick={() => {
                    setConfirmedModalOpen(true);
                    setIsConfirmationModal(false);
                    createAccountingRequest();
                  }}
                  className="bg-[#FF6600] cursor-pointer w-[120px] h-[36px] rounded-[8px] text-[14px] text-white font-medium flex items-center justify-center"
                >
                  Тийм
                </p>
                <p
                  onClick={() => setIsConfirmationModal(false)}
                  className="border border-[#E8E8E8] cursor-pointer w-[120px] h-[36px] rounded-[8px] text-[14px] text-[#21293C] font-medium flex items-center ml-[11px] justify-center"
                >
                  Үгүй
                </p>
              </div>
              <span
                onClick={() => setIsConfirmationModal(false)}
                className="icon-fi-rs-close cursor-pointer absolute top-4 right-4 w-[30px] h-[30px] bg-[#E4E4E5] text-[#21293C] text-[11px] flex items-center justify-center rounded-full"
              />
            </div>
          </div>
        )}
        {confirmedModalOpen && (
          <div className="popup_modal">
            <div className="popup_modal-content w-full sm:min-w-[380px] pb-[30px] min-h-[234px] rounded-[12px] flex flex-col items-center px-[50px]">
              <span className="icon-fi-rs-clock-o text-[#257CEE] text-[24px] p-[12px] bg-[#257CEE] bg-opacity-10 rounded-full mt-[40px]" />
              <p className="text-[18px] font-semibold text-[#21293C] mt-[10px] text-center">
                Таны данс цэнэглэгдэх хүртэл та түр хүлээнэ үү.
              </p>
              <button
                onClick={() => {
                  setConfirmedModalOpen(false);
                  setIsBoostModalOpen(false);
                  router.push(
                    {
                      pathname: `/user/${user.id}/dashboard`,
                      query: { activeIndex: 8 },
                    },
                    `/user/${user.id}/dashboard`
                  );
                }}
                className="w-full h-[36px] bg-caak-primary text-white text-[14px] font-medium mt-[24px] rounded-[8px]"
              >
                Дансны хуулга руу очих
              </button>
              <span
                onClick={() => {
                  setConfirmedModalOpen(false);
                  setIsBoostModalOpen(false);
                }}
                className="icon-fi-rs-close cursor-pointer absolute top-4 right-4 w-[30px] h-[30px] bg-[#E4E4E5] text-[#21293C] text-[11px] flex items-center justify-center rounded-full"
              />
            </div>
          </div>
        )}
      </div>
    </BuyCreditModalLayout>
  );
};

export default BuyCreditModal;
