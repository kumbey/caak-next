import React from 'react'

export default function CaakAdsCard({title, price}) {
  return (
    <div style={{boxShadow: '0px 3px 6px #00000029'}} className='w-full sm:w-[350px] h-[354px] bg-white rounded-[12px] flex flex-col items-center'>
        <div className='mt-[30px] flex flex-row items-center text-[#2B3A4C] text-[24px] font-semibold'><p className={`mr-[5px] ${title === "Hybrid" ? "text-[#FF6600]": "text-[#257CEE]"}`}>{title}</p>багц</div>
        <p className='mt-[13px] text-[46px] font-bold text-[#2B3A4C] h-[60px]'>{price}₮</p>
        <p className='mt-[14px] text-[#2B3A4C] font-semibold text-[#2B3A4C]'>Ашиглагдах Ads төрөл</p>
        <ul className="flex flex-col pl-0 text-medium text-[14px] text-[#5D636B] mt-[14px]">
            <li className={"ads-checked-icon list-none"}>
            Sponsored Post
            </li>
            <li className={"ads-checked-icon list-none"}>
            Pop-Up баннер
            </li>
            <li className={"ads-checked-icon list-none"}>Дагадаг баннер</li>
        </ul>
        <button className='w-[294px] h-[48px] text-white bg-[#FF6600] rounded-[8px] text-[16px] font-medium mt-[30px]'>Худалдаж авах</button>
    </div>
  )
}
