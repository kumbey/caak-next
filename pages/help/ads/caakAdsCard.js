import React, { useState } from "react";
import BuyCreditModal from "../../../src/components/modals/buyCreditModal";

export default function CaakAdsCard({data}) {
  const [isBoostModalOpen, setIsBoostModalOpen] = useState(false);
  const [value, setValue] = useState(null)

  const days = (value / 5000).toFixed(1)

  return (
    <div
      style={{ boxShadow: "0px 3px 6px #00000029" }}
      className="w-full max-w-[260px] bg-white rounded-[12px] flex flex-col items-center px-[16px] py-[20px]"
    >
      <div className="mt-[12px] flex flex-row items-center text-[#2B3A4C] text-[22px] font-semibold">
        <p
          className={`mr-[5px] ${
            data?.id === 0 ? "text-[#FF6600]" : 
            data?.id === 1 ? "text-[#2FC474]" : 
            data?.id === 2 ? "text-[#E60033]" : 
            data?.id === 3 ? "text-[#EFAA00]" : 
            null
          }`}
        >
          {data?.title}
        </p>
        багц
      </div>
      {
        data?.id === 0 ?
          <div className="flex flex-col h-full">
            <input 
              placeholder="Хүссэн дүнгээ оруулна уу." 
              onChange={(e) => setValue(e.target.value)}
              className="w-full text-[#2B3A4C] placeholder-[#777D85] placeholder-text-[15px] placeholder-font-medium border-[#CDCFD9] border-b mt-[17px] pb-[12px]"
            />
            {
              value &&
              <div>
                <span className="text-[#2B3A4C] font-medium text-[15px] mt-[14px] inline-flex">1 өдрийн үнэ: <p className="font-bold ml-[5px]"> 
                {
                  days >= 30 ? 3500 :
                  days >= 20 ? 4000 :
                  days >= 14 ? 45000 :
                  5000
                }
                </p></span>
                <span className="text-[#2B3A4C] font-medium text-[15px] mt-[2px] inline-flex">Нийт хоног: <p className="font-bold ml-[5px]"> 
                {
                  days >= 30 ? (value / 3500).toFixed(1) :
                  days >= 20 ? (value / 4000).toFixed(1) :
                  days >= 14 ? (value / 4500).toFixed(1) :
                  days
                } хоног</p> </span>
                <p className="text-[#2B3A4C] text-[15px] font-semibold mt-[26px]">Таны хэмнэлт</p>
                <p className="mt-[11px] text-[24px] font-bold">
                  {
                    days >= 30 ? (value - (days * 3500)) :
                    days >= 20 ? (value - (days * 4000)) :
                    days >= 14 ? (value - (days * 4500)) :
                    0
                  }
                ₮</p>
              </div>
            }
            <button
              onClick={() => setIsBoostModalOpen(true)}
              className="w-full mt-auto h-[48px] text-white bg-[#FF6600] rounded-[8px] text-[16px] font-medium"
            >
              Худалдаж авах
            </button>
          </div>
        :
        <div>
          <p className="mt-[14px] text-[42px] font-bold text-[#2B3A4C] h-[49px]">
            {data?.price}₮
          </p>
          <p className="text-[#5D636B] text-[16px] font-medium text-center">{data?.boostDays} хоног</p>
          <p className="mt-[16px] text-[#2B3A4C] font-semibold">
            Нэмэлт бонус
          </p>
          <div className="flex items-center justify-center rounded-[8px] w-full h-[42px] bg-[#FFFFFF] border border-[#E4E4E5] text-[14px] mt-[8px]">
            <p className="text-[#257CEE] font-semibold">+ {data?.bonus}₮</p>
          </div>
          <button
            onClick={() => setIsBoostModalOpen(true)}
            className="w-full h-[48px] text-white bg-[#257CEE] rounded-[8px] text-[16px] font-medium mt-[113px]"
          >
            Худалдаж авах
          </button>
        </div>
      }
      {isBoostModalOpen && (
        <BuyCreditModal
          data={data}
          value={value}
          setIsBoostModalOpen={setIsBoostModalOpen}
          isBoostModalOpen={isBoostModalOpen}
        />
      )}
    </div>
  );
}
