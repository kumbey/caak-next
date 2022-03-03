import React, { useEffect, useState } from "react";
import BuyCreditModal from "../../../src/components/modals/buyCreditModal";
import { numberWithCommas } from "../../../src/utility/Util";

export default function CaakAdsCard({ data }) {
  const [isBoostModalOpen, setIsBoostModalOpen] = useState(false);
  const [value, setValue] = useState(null);

  const addCommas = (num) =>
    num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  const removeCommas = (num) => {
    if (num) {
      return parseInt(num.replace(/\./g, ""));
    } else {
      return num;
    }
  };
  const removeNonNumeric = (num) => num.toString().replace(/[^0-9]/g, "");

  const days = Math.floor(removeCommas(value) / 5000);
  const handleChange = (event) => {
    setValue(addCommas(removeNonNumeric(event.target.value)));
  };

  return (
    <div
      style={{ boxShadow: "0px 3px 6px #00000029" }}
      className="w-full max-w-[260px] min-h-[400px] h-full bg-white rounded-[12px] flex flex-col items-center justify-between py-[20px]"
    >
      <div className={"flex flex-col items-center"}>
        <div className="mt-[12px] flex flex-row items-center text-[#2B3A4C] text-[22px] font-semibold">
          <p className={`mr-[5px] ${data?.textColor}`}>{data?.title}</p>
          багц
        </div>
        {data?.id === 0 ? (
          <div className="flex flex-col h-full justify-between">
            <div>
              <div className={"px-[30px]"}>
                <input
                  value={value}
                  placeholder="Хүссэн дүнгээ оруулна уу."
                  onChange={handleChange}
                  className="focus:outline-none customPackInput w-full text-[#2B3A4C] placeholder-[#777D85] text-[24px] placeholder-font-medium border-[#CDCFD9] border-b-[2px] mt-[17px] pb-[2px]"
                />
              </div>

              {value && (
                <div>
                  <div className={"w-full px-[30px]"}>
                    <span className="text-[#2B3A4C] font-medium text-[15px] mt-[14px] inline-flex">
                      1 өдрийн үнэ:{" "}
                      <p className="font-bold ml-[5px]">
                        {days >= 30
                          ? 3500
                          : days >= 20
                          ? 4000
                          : days >= 14
                          ? 45000
                          : 5000}
                      </p>
                    </span>
                    <span className="text-[#2B3A4C] font-medium text-[15px] mt-[2px] inline-flex">
                      Нийт хоног:{" "}
                      <p className="font-bold ml-[5px]">
                        {days >= 30
                          ? Math.floor(removeCommas(value) / 3500)
                          : days >= 20
                          ? Math.floor(removeCommas(value) / 4000)
                          : days >= 14
                          ? Math.floor(removeCommas(value) / 4500)
                          : days}{" "}
                        хоног
                      </p>{" "}
                    </span>
                  </div>
                  <div className={"flex flex-col border-t-[1px] mt-[14px]"}>
                    <div className={"px-[30px] mt-[14px]"}>
                      <p className="text-[#2B3A4C] text-[15px] font-semibold">
                        Таны хэмнэлт
                      </p>
                      <div className={"mt-[11px]"}>
                        <span className="font-roboto text-[#2B3A4C] text-[24px] font-bold">
                          {numberWithCommas(
                            days >= 30
                              ? removeCommas(value) - days * 3500
                              : days >= 20
                              ? removeCommas(value) - days * 4000
                              : days >= 14
                              ? removeCommas(value) - days * 4500
                              : 0,
                            "."
                          )}
                          <span className={"font-inter text-[22px]"}>₮</span>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div
            className={
              "flex flex-col justify-between mt-[14px] w-full px-[16px] items-center"
            }
          >
            <div
              className={
                "text-[42px] font-roboto tracking-[0px] leading-[49px] font-bold text-[#2B3A4C]"
              }
            >
              <span>
                {numberWithCommas(data?.price, ".")}
                <span className={"font-inter text-[40px]"}>₮</span>
              </span>
            </div>

            <p className="mt-[5px] text-[#5D636B] text-[16px] font-medium text-center">
              {data?.boostDays} хоног
            </p>
            <p className="self-start mt-[16px] text-[#2B3A4C] text-[15px] tracking-[0px] leading-[18px] font-semibold ">
              Нэмэлт бонус
            </p>
            <div className="flex items-center justify-center rounded-[8px] w-full h-[42px] bg-[#FFFFFF] border border-[#E4E4E5] text-[14px] mt-[8px]">
              <p className="text-[#257CEE] font-semibold">
                + {numberWithCommas(data?.bonus, ".")}₮
              </p>
            </div>
          </div>
        )}
      </div>
      {isBoostModalOpen && (
        <BuyCreditModal
          data={data}
          value={value}
          setIsBoostModalOpen={setIsBoostModalOpen}
          isBoostModalOpen={isBoostModalOpen}
        />
      )}
      <div className={"px-[16px] w-full"}>
        <button
          onClick={() => setIsBoostModalOpen(true)}
          className={`${
            data?.id === 0 ? "bg-caak-primary" : "bg-[#257CEE]"
          } w-full h-[48px] text-white  rounded-[8px] text-[16px] font-medium`}
        >
          Худалдаж авах
        </button>
      </div>
    </div>
  );
}
