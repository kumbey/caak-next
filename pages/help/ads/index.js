import React, { useState } from "react";
import Link from "next/link";
import AboutCaakAds from "./aboutCaakAds";
import Bg from "../../../public/assets/images/ads.svg";
import Head from "next/head";
import Consts from "../../../src/utility/Consts";

export default function Boost() {
  const [open, setOpen] = useState(false);
  const day = new Date();
  const year = day.getFullYear();
  return (
    <div
      style={{ overflow: open && "hidden" }}
      className="relative bg-white h-[1257px] mt-[20px] lg:mt-[54px]"
    >
      <Head>
        <title>Сурталчилгаа - {Consts.siteMainTitle}</title>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no, viewport-fit=cover"
        />
      </Head>
      <img alt="" className="w-full" src={Bg.src} />
      <div className="absolute top-0 mt-[54px] w-full flex flex-col items-center">
        <div className="max-w-[1090px] w-full flex flex-col items-center">
          <p className="text-[#2B3A4C] font-semibold lg:text-[56px]">
            Таны бизнессийн хурдасгуур
          </p>
          <p className="text-[#6C7392] text-[14px] sm:text-[16px] font-medium mt-[15px] lg:mt-[30px] max-w-[532px] text-center">
            Саак Ads нь хэрэглэгч төвтэй тул таны бизнессийн үйл ажиллагааг илүү
            хүртээмжтэй, оновчтой хүргэх болно.
          </p>
          <div className="flex flex-row flex-wrap  justify-center gap-[20px] mt-[30px] lg:mt-[69px]">
            <div style={{boxShadow: '0px 3px 6px #00000029'}} className="relative h-[654px] w-[350px] border border-[#D6F1FF] bg-white rounded-[12px] flex flex-col items-center px-[28px]">
              <p className="text-[#2B3A4C] font-semibold text-[32px] mt-[47px]">
                Sponsored post
              </p>
              <p className="text-[16px] font-semibold text-[#2B3A4C] mt-[5px]">
                <span className="text-[#FF6600]">Пост</span> бүүстлэх
              </p>
              <p className="text-[#2B3A4C] text-[50px] font-roboto font-bold flex items-center mt-[41px]">
                <span className="text-[46px] font-medium">₮</span>
                5.500
              </p>
              <p className="text-[#5D636B] font-medium text-[16px]">1 хоног</p>
              <div className="w-full h-[95px] rounded-[8px] bg-[#FF66000A] border border-[#FF660033] mt-[17px] flex items-center">
                <ul>
                  <li>
                    <p className="text-[#5D636B] font-medium text-[14px]">
                      14+ хоног бол{" "}
                      <span className="text-[#FF6600] font-semibold">
                        5,000 төг
                      </span>
                    </p>
                  </li>
                  <li>
                    <p className="text-[#5D636B] font-medium text-[14px]">
                      20+ хоног бол{" "}
                      <span className="text-[#FF6600] font-semibold">
                        4,500 төг
                      </span>
                    </p>
                  </li>
                  <li>
                    <p className="text-[#5D636B] font-medium text-[14px]">
                      30+ хоног бол{" "}
                      <span className="text-[#FF6600] font-semibold">
                        4,000 төг
                      </span>
                    </p>
                  </li>
                </ul>
              </div>
              <button
                onClick={() => setOpen(1)}
                className="w-full h-[48px] rounded-[8px] bg-caak-primary text-white text-[16px] font-medium mt-[20px]"
              >
                Жишээ харах
              </button>
              <p className="text-[#2B3A4C] texrt-[15px] font-semibold mt-[25px] w-full">
                Постын байршил:
              </p>
              <ul className="flex flex-col w-full pl-0 text-medium text-[14px] text-[#5D636B]">
                <li className={"ads-checked-icon list-none"}>
                  Нүүр хуудасны постон дунд
                </li>
                <li className={"ads-checked-icon list-none"}>
                  Постны дэлгэрэнгүй хуудас дотор
                </li>
                <li className={"ads-checked-icon list-none"}>Группуудын постон дунд</li>
                <li className={"ads-plus-icon list-none"}>Сонирхол, нас, хүйс сонгож бүүстлэх</li>
              </ul>
              <p className="w-full text-[#2B3A4C] text-[15px] font-semibold mt-[22px]">
                Нэг постонд багтах зургийн тоо:
              </p>
              <ul className="flex flex-col w-full pl-0 text-medium text-[14px] text-[#5D636B]">
                <li className={"ads-checked-icon list-none"}>30ш</li>
              </ul>
              <p className="absolute top-[-15px] bg-gradient-to-r from-[#9A99FE] to-[#3F70FE] w-[172px] h-[30px] rounded-[4px] text-white text-[15px] flex items-center justify-center">
                Хамгийн эрэлттэй
              </p>
            </div>

            <div style={{boxShadow: '0px 3px 6px #00000029'}} className="h-[654px] border border-[#D6F1FF] w-[350px] bg-white rounded-[12px] flex flex-col items-center px-[28px]">
              <p className="text-[#2B3A4C] font-semibold text-[38px] mt-[47px]">
                A1
              </p>
              <p className="text-[16px] font-semibold text-[#2B3A4C] mt-[5px]">
                <span className="text-[#257CEE]">Pop-Up</span> баннер
              </p>
              <p className="text-[#2B3A4C] text-[50px] font-roboto font-bold flex items-center mt-[41px]">
                <span className="text-[46px] font-medium">₮</span>
                220.000
              </p>
              <p className="text-[#5D636B] font-medium text-[16px]">1 хоног</p>
              <button
                onClick={() => setOpen(2)}
                className="w-full h-[48px] rounded-[8px] bg-[#257CEE] border border-[#257CEE] text-white text-[16px] font-medium mt-[20px]"
              >
                Жишээ харах
              </button>
              <p className="text-[#2B3A4C] texrt-[15px] font-semibold mt-[25px] w-full">
                Баннерын байршил:
              </p>
              <ul className="flex flex-col w-full pl-0 text-medium text-[14px] text-[#5D636B]">
               <li className={"ads-checked-icon list-none"}>Нүүр хуудасны голд</li>
               <li className={"ads-checked-icon list-none"}>Постны дэлгэрэнгүй хуудас бүрт</li>
              </ul>
              <p className="w-full text-[#2B3A4C] text-[15px] font-semibold mt-[22px]">
                Файлын төрөл:
              </p>
              <ul className="flex flex-col w-full pl-0 text-medium text-[14px] text-[#5D636B] mt-[15px]">
                <li className={"ads-checked-icon list-none"}>JPEG,GIF, PNG</li>
              </ul>
            </div>

            <div style={{boxShadow: '0px 3px 6px #00000029'}} className="h-[654px] border border-[#D6F1FF] w-[350px] bg-white rounded-[12px] flex flex-col items-center px-[28px]">
              <p className="text-[#2B3A4C] font-semibold text-[38px] mt-[47px]">
                A2
              </p>
              <p className="text-[16px] font-semibold text-[#2B3A4C] mt-[5px]">
                <span className="text-[#257CEE]">Дагадаг</span> баннер
              </p>
              <p className="text-[#2B3A4C] text-[50px] font-roboto font-bold flex items-center mt-[41px]">
                <span className="text-[46px] font-medium">₮</span>
                165.000
              </p>
              <p className="text-[#5D636B] font-medium text-[16px]">1 хоног</p>
              <button
                onClick={() => setOpen(3)}
                className="w-full h-[48px] rounded-[8px] bg-[#257CEE] border border-[#257CEE] text-white text-[16px] font-medium mt-[20px]"
              >
                Жишээ харах
              </button>
              <p className="text-[#2B3A4C] texrt-[15px] font-semibold mt-[25px] w-full">
                Баннерын байршил:
              </p>
              <ul className="flex flex-col w-full pl-0 text-medium text-[14px] text-[#5D636B]">
                <li className={"ads-checked-icon list-none"}>Нүүр хуудасны баруун талд дагана</li>
                <li className={"ads-checked-icon list-none"}>Постны дэлгэрэнгүй хуудас бүрт</li>
              </ul>
              <p className="w-full text-[#2B3A4C] text-[15px] font-semibold mt-[22px]">
                Файлын төрөл:
              </p>
              <ul className="flex flex-col w-full pl-0 text-medium text-[14px] text-[#5D636B] mt-[15px]">
                <li className={"ads-checked-icon list-none"}>JPEG,GIF, PNG</li>
              </ul>
            </div>
          </div>
          <div className="flex flex-col mx-[10px] md:mx-0 md:flex-row w-full justify-between mt-[20px] lg:mt-[44px] px-[5px] md:px-[22px]">
              <div>
                <ul className="list-decimal text-[14px] text-[#0D1026] list-inside pl-0">
                  <p className="text-[#E60033] flex items-center font-semibold text-[16px]">
                    <span className="icon-fi-rs-danger text-[22px] mr-[9px]" />
                    Анхаарах зүйлс
                  </p>
                  <li className=" mt-[16px]">Эдгээр үнэнд НӨАТ орсон болно</li>
                  <li>
                    Сурталчилгааны агуулга нь Монгол Улсын хууль журмыг
                    зөрчөөгүй байх
                  </li>
                  <li>
                    Сурталчилгааны үнэн, бодит байдлыг захиалагч байгууллага
                    хариуцна
                  </li>
                  <li>
                    Баннер, пост нь солигдох зарчмаар хэрэглэгчид харагдана
                  </li>
                </ul>
              </div>
              <div className="mt-[20px] md:mt-0">
                <p className="text-[14px] md:text-[16px] font-semibold text-[#21293C] flex items-center">
                  <span className="icon-fi-rs-phone-thick text-[18px] mr-[10px]" />
                  72728008, 99093445
                </p>
                <p className="text-[14px] md:text-[16px] font-semibold text-[#21293C] flex items-center">
                  <span className="icon-fi-rs-mail-thick text-[18px] mr-[10px]" />
                  marketing@caak.mn
                </p>
              </div>
            </div>
        </div>
        <div className="bg-white h-[200px] border-t border-[#D9E3EF] sm:h-[155px] flex w-full justify-center mt-[30px] md:mt-[70px]">
          <div className="w-full sm:w-[670px] md:w-[870px] xl:w-[1247px]">
            <div className="text-[15px] text-[#6C7392] flex flex-wrap justify-center sm:justify-start gap-[4px] sm:flex-row sm:h-[69px] border-b sm:items-end pb-[18px] border-color:[#F3F3F4]">
              <Link href="/help/connectus" shallow>
                <a>
                  <p>Холбоо барих</p>
                </a>
              </Link>
              <Link href={"/help/ads"} shallow>
                <a className="sm:ml-[10px] md:ml-[35px]">
                  <p>Сурталчилгаа</p>
                </a>
              </Link>
              <Link
                href={{
                  pathname: "/help/secure",
                  query: {
                    index: 1,
                  },
                }}
                shallow
              >
                <a className="sm:ml-[10px] md:ml-[35px]">
                  <p>Үйлчилгээний нөхцөл</p>
                </a>
              </Link>
              <Link
                href={{
                  pathname: "/help/secure",
                  query: {
                    index: 2,
                  },
                }}
                shallow
              >
                <a className="sm:ml-[10px] md:ml-[35px]">
                  <p>Нууцлал</p>
                </a>
              </Link>
              <Link href="/help" shallow>
                <a className="sm:ml-[10px] md:ml-[35px]">
                  <p>Тусламж</p>
                </a>
              </Link>
            </div>
            <div className="sm:flex text-[15px] text-[#6C7392] mt-[10px] sm:mt-[25.5px] pb-[20px]">
              <p className="md:ml-[16px] text-center">{`©${year} "Саак Холдинг" ХХК`}</p>
            </div>
          </div>
        </div>
        <AboutCaakAds setOpen={setOpen} open={open} />
      </div>
    </div>
  );
}
