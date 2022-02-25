import useModalLayout from "../../../hooks/useModalLayout";
import Bank from "./bank";
import golomt from "/public/assets/images/bankLogos/Golomt.png";
import khan from "/public/assets/images/bankLogos/khanbank.png";
import tdb from "/public/assets/images/bankLogos/tdbblue.png";
import { useEffect, useState } from "react";
import Button from "../../button";
import useScrollBlock from "../../../hooks/useScrollBlock";

const BuyCreditModal = ({ setIsBoostModalOpen }) => {
  const [blockScroll, allowScroll] = useScrollBlock();
  const banks = [
    { id: 0, logo: khan, name: "Хаан Банк", accountNumber: "5212 062 121" },
    {
      id: 1,
      logo: tdb,
      name: "Худалдаа Хөгжлийн Банк",
      accountNumber: "5212 023 121",
    },
    {
      id: 2,
      logo: golomt,
      name: "Голомт Банк",
      accountNumber: "1234 062 121",
    },
  ];
  const [selectedBankId, setSelectedBankId] = useState(null);
  const BuyCreditModalLayout = useModalLayout({ layoutName: "boostModal" });
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
              <p className={"text-caak-generalblack text-[15px]"}>100,000₮</p>
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
                ck300
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
                99093445
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
        </div>
        <div
          className={
            "rounded-[8px] bg-white mt-[22px] lg:mt-0 ml-0 lg:ml-[22px] h-[fit-content] min-w-[320px] max-w-[400px] shadow-card"
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
                Premium&nbsp;
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
                100.000₮
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
                <li className={"ads-checked-icon list-none"}>Sponsored Post</li>
                <li className={"ads-checked-icon list-none"}>Pop-Up баннер</li>
                <li className={"ads-checked-icon list-none"}>Дагадаг баннер</li>
              </ul>
            </div>
            <Button
              skin={"primary"}
              className={
                "w-full mt-[14px] h-[44px] text-[16px] tracking-[0.24px] leading-[20px] font-medium"
              }
            >
              Хүсэлт илгээх
            </Button>
            <p
              className={
                "text-[14px] font-medium leading-[20px] tracking-[0px] text-[#E60033] mt-[14px] text-center"
              }
            >
              Хүсэлт илгээхээс өмнө &quot;Гүйлгээ хийх Банк дахь дансаа сонгоно
              төлбөрөө&quot; шилжүүлнэ үү!
            </p>
          </div>
        </div>
      </div>
    </BuyCreditModalLayout>
  );
};

export default BuyCreditModal;
