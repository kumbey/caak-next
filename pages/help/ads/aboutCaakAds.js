import React, { useState } from "react";
import Post1 from "../../../public/assets/images/post.png";
import Post1Mobile from "../../../public/assets/images/postMobile.png";
import Post2 from "../../../public/assets/images/post2.png";
import Post2Mobile from "../../../public/assets/images/a2mobile.png";
import PostHome from "../../../public/assets/images/homepost.png";
import PostHome2 from "../../../public/assets/images/homepost2.png";
import Consts from "../../../src/utility/Consts";
import Head from "next/head";
import BuyCreditModal from "../../../src/components/modals/buyCreditModal";

export default function AboutCaakAds({ open, setOpen }) {
  const [selected, setSelected] = useState(0);
  const [isBoostModalOpen, setIsBoostModalOpen] = useState(false)
  const screenType = [
    {
      title: "Desktop",
    },
    {
      title: "Mobile",
    },
  ];
  const adsLocation = [
    {
      title: "Нүүр хуудас",
    },
    {
      title: "Пост дэлгэрэнгүй",
    },
  ];
  return (
    <>
      <Head>
        <title>{Consts.siteMainTitle} - Сурталчилгаа</title>
      </Head>
      {open === 2 ? (
        <div className="popup_modal">
          <div className="about_popup_banner_mobile lg:about_popup_banner flex flex-col items-center rounded-[12px]">
            <div className="flex flex-row items-center w-full justify-between px-[16px]">
              <span />
              <p className="text-[20px] font-semibold mt-[20px] mb-[17px]">
                <span className="text-[#257CEE]">A1 Pop-Up</span> баннер жишээ
              </p>
              <span
                onClick={() => setOpen(false)}
                className="icon-fi-rs-close cursor-pointer text-[#21293C] w-[30px] text-[12px] flex items-center justify-center h-[30px] rounded-full bg-[#E4E4E5]"
              />
            </div>
            <div className="w-full bg-[#ECECEF] px-[30px] pb-[49px] flex flex-col items-center">
              <div className="relative flex flex-col md:flex-row items-center justify-center w-full mt-[38px]">
                <p className="text-[#21293C] text-[16px] md:text-[20px] font-semibold">
                  Нүүр хуудсанд харагдах байдал
                </p>
                <div className="sm:absolute right-0 bg-[#D7D7DB] rounded-[8px] flex flex-row items-center">
                  {screenType.map((data, index) => {
                    return (
                      <p
                        onClick={() => setSelected(index)}
                        className={`${
                          selected === index ? "bg-white" : ""
                        } w-[100px] m-[6px] text-[14px] font-medium text-[#2B3A4C] cursor-pointer h-[30px] rounded-[6px] flex items-center justify-center`}
                        key={index}
                      >
                        {data.title}
                      </p>
                    );
                  })}
                </div>
              </div>
              <img
                alt=""
                className="w-full md:w-auto md:h-[729px] mt-[30px]"
                src={selected === 0 ? Post1.src : Post1Mobile.src}
              />
            </div>
            <p className="w-full px-[40px] h-full flex items-center text-[16px] mt-[20px] mb-[14px]">
              <span className="font-bold mr-[5px] text-[#21293C]">Хэмжээ:</span> 150х150,
              500x500
            </p>
          </div>
          <div className="sticky px-[10px] sm:px-[20px] bottom-[10px] sm:bottom-[40px] left-2 sm:float-right sm:mr-[30px] bg-white w-[200px] sm:w-[260px] pb-[18px] rounded-[6px] flex flex-col items-center">
            <p className="text-[#2B3A4C] text-[38px] h-[46px] font-semibold">
              A1
            </p>
            <p className="text-[14px] font-semibold text-[#2B3A4C]">
              <span className="text-[#257CEE]">Pop-Up</span> баннер
            </p>
            <span className="w-full h-[1px] bg-[#E4E4E5] mt-[14px]" />
            <p className="text-[#2B3A4C] text-[22px] sm:text-[40px] sm:h-[42px] font-bold mt-[25px]">
              <span className="text-[20px] sm:text-[38px] font-medium">₮</span>
              220.000
            </p>
            <p className="text-[#5D636B]">1 хоног</p>
            <p className="text-[#2B3A4C] text-[14px] font-bold w-full mt-[5px] sm:mt-[16px]">
              Баннерын байршил:
            </p>
            <ul className="w-full flex flex-col pl-0 text-[#5D636B] text-[14px] font-medium mt-[10px]">
              <li className={"ads-checked-icon list-none"}>Нүүр хуудасны голд</li>
              <li className={"ads-checked-icon list-none"}>Постны дэлгэрэнгүй хуудаст</li>
            </ul>
            <button onClick={() => setIsBoostModalOpen(true)} className="bg-caak-primary w-full h-[40px] text-white text-[16px] font-medium rounded-[6px] mt-[14px]">
              Захиалах
            </button>
          </div>
        </div>
      ) : open === 3 ? (
        <div className="popup_modal">
          <div className="about_popup_banner_mobile lg:about_popup_banner flex flex-col items-center rounded-[12px]">
            <div className="flex flex-row items-center w-full justify-between px-[16px]">
              <span />
              <p className="text-[20px] font-semibold mt-[20px] mb-[17px]">
                <span className="text-[#257CEE]">A2 Дагадаг</span> баннер жишээ
              </p>
              <span
                onClick={() => setOpen(false)}
                className="icon-fi-rs-close text-[#21293C] cursor-pointer w-[30px] text-[11.6px] flex items-center justify-center h-[30px] rounded-full bg-[#E4E4E5]"
              />
            </div>
            <div className="w-full bg-[#ECECEF] px-[30px] pb-[49px] flex flex-col items-center">
              <div className="relative flex flex-col md:flex-row items-center justify-center w-full mt-[38px]">
                <p className="text-[#21293C] text-[16px] md:text-[20px] font-semibold">
                  Нүүр хуудсанд харагдах байдал
                </p>
                <div className="sm:absolute right-0 bg-[#D7D7DB] rounded-[8px] flex flex-row items-center">
                  {screenType.map((data, index) => {
                    return (
                      <p
                        onClick={() => setSelected(index)}
                        className={`${
                          selected === index ? "bg-white" : ""
                        } w-[100px] m-[6px] text-[14px] font-medium text-[#2B3A4C]  cursor-pointer h-[30px] rounded-[6px] flex items-center justify-center`}
                        key={index}
                      >
                        {data.title}
                      </p>
                    );
                  })}
                </div>
              </div>
              <img
                alt=""
                className="w-full md:w-auto md:h-[729px] mt-[30px]"
                src={selected === 0 ? Post2.src : Post2Mobile.src}
              />
            </div>
            <p className="w-full px-[40px] h-full flex items-center text-[16px] mt-[20px] mb-[14px]">
              <span className="font-bold mr-[5px] text-[#21293C]">Хэмжээ:</span> 320х400
            </p>
          </div>
          <div className="sticky px-[10px] sm:px-[20px] bottom-[10px] sm:bottom-[40px] left-2 sm:float-right sm:mr-[30px] bg-white w-[200px] sm:w-[260px] pb-[18px] rounded-[6px] flex flex-col items-center">
            <p className="text-[#2B3A4C] text-[38px] h-[46px] font-semibold">
              A2
            </p>
            <p className="text-[14px] text-[#2B3A4C] font-semibold">
              <span className="text-[#257CEE]">Дагадаг</span> баннер
            </p>
            <span className="w-full h-[1px] bg-[#E4E4E5] mt-[14px]" />
            <p className="text-[#2B3A4C] text-[22px] sm:text-[40px] h-[42px] font-bold mt-[25px]">
              <span className="text-[20px] sm:text-[38px] font-medium">₮</span>
              165.000
            </p>
            <p className="text-[#5D636B]">1 хоног</p>
            <p className="text-[#2B3A4C] text-[14px] font-bold w-full mt-[5px] sm:mt-[16px]">
              Баннерын байршил:
            </p>
            <ul className="w-full flex flex-col pl-0 text-[#5D636B] text-[14px] font-medium mt-[10px]">
              <li className={"ads-checked-icon list-none"}>Нүүр хуудасны баруун талд</li>
              <li className={"ads-checked-icon list-none"}>Постны дэлгэрэнгүй хуудаст</li>
            </ul>
            <button onClick={() => setIsBoostModalOpen(true)} className="bg-caak-primary w-full h-[40px] text-white text-[16px] font-medium rounded-[6px] mt-[14px]">
              Захиалах
            </button>
          </div>
        </div>
      ) : open === 1 ? (
        <div className="popup_modal">
          <div className="about_popup_banner_mobile lg:about_popup_banner flex flex-col items-center rounded-[12px]">
            <div className="flex flex-row items-center w-full justify-between px-[16px]">
              <span />
              <p className="text-[20px] text-[#2B3A4C] font-semibold mt-[20px] mb-[17px]">
                <span className="text-[#FF6600]">Sponsored post</span> жишээ
              </p>
              <span
                onClick={() => setOpen(false)}
                className="icon-fi-rs-close text-[#21293C] cursor-pointer w-[30px] text-[11.6px] flex items-center justify-center h-[30px] rounded-full bg-[#E4E4E5]"
              />
            </div>
            <div className="w-full bg-[#ECECEF] px-[30px] pb-[49px] flex flex-col items-center">
              <div className="relative flex flex-col md:flex-row items-center justify-center w-full mt-[38px]">
                <p className="text-[#21293C] text-[16px] sm:text-[20px] font-semibold">
                  Харагдах байдал
                </p>
                <div className="sm:absolute right-0 bg-[#D7D7DB] rounded-[8px] flex flex-row items-center">
                  {adsLocation.map((data, index) => {
                    return (
                      <p
                        onClick={() => setSelected(index)}
                        className={`${
                          selected === index ? "bg-white" : ""
                        } m-[6px] px-[4px] text-[14px] font-medium text-[#2B3A4C] lg:px-[14px] cursor-pointer text-center lg:h-[30px] rounded-[6px] flex items-center justify-center`}
                        key={index}
                      >
                        {data.title}
                      </p>
                    );
                  })}
                </div>
              </div>
              <img
                alt=""
                className="w-full mt-[30px]"
                src={selected === 0 ? PostHome.src : PostHome2.src}
              />
            </div>
            <p className="w-full px-[15px] md:px-[40px] h-full flex items-center text-[14px] md:text-[16px] mt-[20px] mb-[14px]">
              <span className="font-bold mr-[5px] text-[#21293C]">
                Нийт постонд багтах зургийн тоо:
              </span>{" "}
              30ш
            </p>
          </div>
          <div className="sticky bottom-[10px] sm:bottom-[40px] left-2 sm:float-right sm:mr-[30px] bg-white w-[200px] sm:w-[320px] pb-[18px] rounded-[6px] flex flex-col items-center">
            <p className="text-[#2B3A4C] text-[18px] lg:text-[30px] mt-[14px] h-[36px] font-semibold">
              Sponsored Post
            </p>
            <p className="text-[14px] text-[#0D1026] font-semibold">
              <span className="text-[#257CEE]">Пост</span> бүүстлэх
            </p>
            <span className="w-full h-[1px] bg-[#E4E4E5] mt-[14px]" />
            <p className="text-[#2B3A4C] text-[22px] h-[42px] sm:text-[40px] font-bold mt-[10px] lg:mt-[24.6px]">
              <span className="text-[20px] sm:text-[38px] font-medium">₮</span>
              5.000
            </p>
            <p className="text-[#5D636B]">1 хоног</p>
            <div className="w-full px-[10px] sm:px-[20px]">
              <div className="w-full hidden sm:block h-[95px] rounded-[8px] bg-[#FF66000A] border border-[#FF660033] mt-[14px]">
                <ul className="flex flex-col h-full justify-center">
                  <li>
                    <p className="text-[#5D636B] font-medium text-[14px]">
                      14+ хоног бол{" "}
                      <span className="text-[#FF6600] font-semibold">
                        4,500 төг
                      </span>
                    </p>
                  </li>
                  <li>
                    <p className="text-[#5D636B] font-medium text-[14px]">
                      20+ хоног бол{" "}
                      <span className="text-[#FF6600] font-semibold">
                        4,000 төг
                      </span>
                    </p>
                  </li>
                  <li>
                    <p className="text-[#5D636B] font-medium text-[14px]">
                      30+ хоног бол{" "}
                      <span className="text-[#FF6600] font-semibold">
                        3,500 төг
                      </span>
                    </p>
                  </li>
                </ul>
              </div>
            </div>
            <p className="text-[#2B3A4C] px-[10px] sm:px-[20px] text-[14px] font-bold w-full mt-[5px] sm:mt-[20px]">
              Постын байршил:
            </p>
            <ul className="flex flex-col w-full px-[10px] text-[#5D636B] sm:px-[20px] pl-0 text-medium text-[14px] text-[#5D636B]">
              <li className={"ads-checked-icon list-none"}>Нүүр хуудасны постон дунд</li>
              <li className={"ads-checked-icon list-none"}>Постны дэлгэрэнгүй хуудас дотор</li>
              <li className={"ads-checked-icon list-none"}>Группуудын постон дунд</li>
              <li className={"ads-plus-icon list-none"}>Сонирхол, нас, хүйс сонгож бүүстлэх</li>
            </ul>
            <button onClick={() => setIsBoostModalOpen(true)} className="bg-caak-primary w-[282px] h-[40px] text-white text-[16px] font-medium rounded-[6px] mt-[20px]">
              Захиалах
            </button>
          </div>
          {
            isBoostModalOpen && <BuyCreditModal setIsBoostModalOpen={setIsBoostModalOpen} isBoostModalOpen={isBoostModalOpen}/>
          }
        </div>
      ) : null}
    </>
  );
}
