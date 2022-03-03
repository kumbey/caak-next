import useModalLayout from "../../../hooks/useModalLayout";
import Bank from "./bank";
import golomt from "/public/assets/images/bankLogos/Golomt.png";
import khan from "/public/assets/images/bankLogos/khanbank.png";
import tdb from "/public/assets/images/bankLogos/tdbblue.png";
import React, {useEffect, useState} from "react";
import Button from "../../button";
import useScrollBlock from "../../../hooks/useScrollBlock";
import {API} from "aws-amplify";
import {createAccouningtRequest} from "../../../graphql-custom/accountingRequest/mutation";
import {useUser} from "../../../context/userContext";
import {getReturnData} from "../../../utility/Util";

const BuyCreditModal = ({setIsBoostModalOpen, data}) => {
  const [blockScroll, allowScroll] = useScrollBlock();
  const {user} = useUser()
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
  const [selectedBankId, setSelectedBankId] = useState(null);
  const BuyCreditModalLayout = useModalLayout({layoutName: "boostModal"});

  const createAccountingRequest = async () => {
    let resp = API.graphql({
      query: createAccouningtRequest,
      variables: {
        user_id: user.id,
        status: "REQUESTED",
        userStatus: `${user.id}#REQUESTED`,
        pack: data.type,
        phoneNumber: "99369522",
        meta: JSON.stringify([{
          action: "REQUESTED",
          amount: data.price,
          date: new Date().toISOString(),
          user: user.id,
          bank: {
            name: banks[selectedBankId].name,
            account_number: banks[selectedBankId].accountNumber
          }
        }])
      }
    })
    resp = getReturnData(resp)
  }

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
                {data.price}₮
              </p>
            </div>
          </div>
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
                {data.price === 100000
                  ? "caak100"
                  : data.price === 200000
                    ? "caak200"
                    : data.price === 500000
                      ? "caak500"
                      : "custom"}
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
                Таны утасны дугаар
              </p>
            </div>
          </div>
          {/* <div className={"flex flex-col mt-[14px]"}>
            <div
              className={
                "flex flex-row items-center text-caak-generalblack text-[15px] leading-[24px]"
              }
            >
              <p className={"font-medium"}>Багцын код:&nbsp;</p>
              <p>ck300</p>
            </div>
            <div
              className={
                "flex flex-row items-center text-caak-generalblack text-[15px] leading-[24px]"
              }
            >
              <p className={"font-medium"}>Таны утасны дугаар:&nbsp;</p>
              <p>9093445</p>
            </div>
          </div> */}
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
            // onClick={() => createAccountingRequest()}
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
                "flex flex-col items-center p-[20px] rounded-[8px] bg-caak-extraLight max-w-[368px] h-full w-full min-h-[237px] h-full"
              }
            >
              <span
                className={
                  "text-[#257CEE] font-semibold text-[18px] tracking-[0.27px] leading-[28px]"
                }
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
                {data.price}₮
              </p>
              <p
                className={
                  "text-[15px] font-semibold leading-[19px] tracking-[0px] text-[#2B3A4C] mt-[16px]"
                }
              >
                Ашиглагдах Ads төрөл
              </p>
              <ul
                className={
                  "mt-[14px] p-0 text-[14px] font-medium tracking-[0px] leading-[28px] text-[#5D636B]"
                }
              >
                <li className={"ads-checked-icon list-none"}>
                  <p className={"text-caak-primary inline-flex"}>БОНУС:&nbsp;</p>
                  {data.bonus}₮
                </li>
                <li className={"ads-checked-icon list-none"}>
                  <p className={"font-bold inline-flex"}>
                    {data.boostDays}&nbsp;
                  </p>{" "}
                  өдөр бүүстлэх
                </li>
              </ul>
            </div>
            {/* <p
              className={
                "text-[14px] font-medium leading-[20px] tracking-[0px] text-[#E60033] mt-[14px] text-center"
              }
            >
              Хүсэлт илгээхээс өмнө &quot;Гүйлгээ хийх Банк дахь дансаа сонгоно
              төлбөрөө&quot; шилжүүлнэ үү!
            </p> */}
          </div>
        </div>
      </div>
    </BuyCreditModalLayout>
  );
};

export default BuyCreditModal;
