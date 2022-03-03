import React, { useState } from "react";
import BuyCreditModal from "../../../src/components/modals/buyCreditModal";

export default function CaakAdsCard({data}) {
  const [isBoostModalOpen, setIsBoostModalOpen] = useState(false);

  return (
    <div
      style={{ boxShadow: "0px 3px 6px #00000029" }}
      className="w-full max-w-[280px] bg-white rounded-[12px] flex flex-col items-center px-[28px] py-[24px]"
    >
      <div className="mt-[6px] flex flex-row items-center text-[#2B3A4C] text-[24px] font-semibold">
        <p
          className={`mr-[5px] ${
            data?.title === "Hybrid" ? "text-[#FF6600]" : "text-[#257CEE]"
          }`}
        >
          {data?.title}
        </p>
        багц
      </div>
      <p className="mt-[13px] text-[46px] font-bold text-[#2B3A4C] h-[60px]">
        {data?.price}₮
      </p>
      <span className="mt-[14px] text-[#2B3A4C] font-semibold text-[#2B3A4C]">
        Нэмэлт бонус
      </span>
      <ul className="flex flex-col pl-0 text-medium text-[14px] text-[#5D636B] mt-[14px]">
        <li className={"ads-checked-icon list-none inline-flex"}><p className={"text-caak-primary"}>БОНУС:&nbsp;</p>{data?.bonus}₮</li>
        <li className={"ads-checked-icon list-none inline-flex"}>
          <p className={"font-bold"}>{data?.boostDays}&nbsp;</p> өдөр бүүстлэх
        </li>
      </ul>
      <button
        onClick={() => setIsBoostModalOpen(true)}
        className="w-full h-[48px] text-white bg-[#FF6600] rounded-[8px] text-[16px] font-medium mt-[30px]"
      >
        Худалдаж авах
      </button>
      {isBoostModalOpen && (
        <BuyCreditModal
          data={data}
          setIsBoostModalOpen={setIsBoostModalOpen}
          isBoostModalOpen={isBoostModalOpen}
        />
      )}
    </div>
  );
}
