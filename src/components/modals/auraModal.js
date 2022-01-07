import { useState } from "react";
import Button from "../button";
import Image from "next/image";
import helloImg from "../../../public/assets/images/Hello.svg";
import auraImg from "../../../public/assets/images/AuraSM.png";
import { useRouter } from "next/router";

const AuraModal = ({ isOpen, setIsOpen }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [isNext, setIsNext] = useState(false);

  return isOpen ? (
    <div className="popup_modal">
      <div className="popup_modal-report  ">
        {!isNext ? (
          <div className="flex flex-col">
            <div
              className={
                "flex justify-center items-center relative py-[20px] px-[20px] bg-caak-macarooncream rounded-t-xl"
              }
            >
              <div className="flex justify-center h-[180px] w-full ">
                <img
                  // priority={true}
                  className="object-cover bg-white rounded-[10px] bg-transparent"
                  src={helloImg.src}
                  height={180}
                  // layout="fixed"
                  // objectFit={"cover"}
                  alt="#"
                />
              </div>
              <div
                onClick={() => setIsOpen(false)}
                className={
                  "flex items-center justify-center w-[30px] h-[30px] rounded-full bg-white absolute right-[16px] top-[16px] cursor-pointer"
                }
              >
                <span className={"icon-fi-rs-close text-[14px]"} />
              </div>
            </div>
            <div className="flex flex-col py-[20px] px-[95px] items-center justify-center  bg-white rounded-b-xl">
              <p className="font-inter font-semibold text-20px text-caak-generalblack text-center mb-[12px]">
                Групп нээхэд таны <br /> Аура оноо хүрэлцэхгүй байна.
              </p>

              <div
                className={
                  "text-[15px] flex flex-row flex-wrap items-center justify-center text-caak-darkBlue text-center tracking-[0.23px] leading-[20px]"
                }
              >
                Аура оноо
                <div className={"flex flex-row  items-center flex-shrink-0"}>
                  <div className={"w-[14px] h-[14px] relative"}>
                    <img
                      // quality={100}
                      src={auraImg}
                      alt={""}
                      // layout={"fill"}
                    />
                  </div>
                  <p className={"text-caak-primary"}>5000+</p> цуглуулсан
                </div>
                байх шаардлагатай.
              </div>

              <Button
                loading={loading}
                onClick={() => {
                    router.push(
                      {
                        pathname: `/help/aura`,
                      },
                      `/help/aura`
                    );
                    setIsOpen(false)
                  }}
                className="bg-caak-primary font-inter font-medium  text-14px text-white mt-[20px]"
              >
                Аура гэж юу вэ?
              </Button>
            </div>
          </div>
        ) : (
          <div className="flex flex-col">
            <div
              className={
                "  flex  justify-center items-center relative py-[20px] px-[20px] bg-caak-macarooncream rounded-t-xl"
              }
            >
              <div
                onClick={() => setIsOpen(false)}
                className={
                  "flex items-center justify-center w-[30px] h-[30px] rounded-full bg-caak-titaniumwhite absolute right-0 top-[0px] cursor-pointer"
                }
              >
                <span className={"icon-fi-rs-close text-[14px]"} />
              </div>
              <div className="flex justify-center h-[180px] w-full ">
                <img
                  className="object-cover bg-white rounded-[10px] bg-transparent"
                  src={helloImg}
                  height={180}
                  // layout="fixed"
                  // objectFit={"cover"}
                  alt="#"
                />
              </div>
            </div>
            <div className="  bg-white rounded-b-xl">
              <div className="flex flex-col py-[20px] px-[50px]  items-center justify-center">
                <p className="font-inter font-semibold text-20px text-caak-generalblack text-center mb-[12px]">
                  Аура гэж юу вэ?
                </p>
                <p className=" font-inter font-normal text-15px text-caak-darkBlue text-center mb-[25px]">
                  Аура гэдэг нь таны идэвхийн оноо юм.
                  <br /> Таны аура оноо өндөр байвал дараах давуу талтай.
                </p>
              </div>

              <div className="flex flex-col mb-[28px] px-[60px]  ">
                <div className="flex justify-start mb-[20px]">
                  <span className="icon-fi-rs-trophy text-20px text-caak-generalblack" />
                  <p className="font-inter font-normal text-15px text-caak-generalblack">
                    Шагнал авах
                  </p>
                </div>
                <div className="flex justify-start mb-[20px]">
                  <span className="icon-fi-rs-trophy text-20px text-caak-generalblack" />
                  <p className="font-inter font-normal text-15px text-caak-generalblack">
                    Пост бүүстлэх эрх
                  </p>
                </div>
                <div className="flex justify-start mb-[20px]">
                  <span className="icon-fi-rs-trophy text-20px text-caak-generalblack" />
                  <p className="font-inter font-normal text-15px text-caak-generalblack">
                    Орлоготой нийтлэгч болох
                  </p>
                </div>
                <div className="flex justify-start ">
                  <span className="icon-fi-rs-trophy text-20px text-caak-generalblack" />
                  <p className="font-inter font-normal text-15px text-caak-generalblack">
                    Харилцагч байгууллагуудын бүтээгдэхүүн, үйлчилгээг
                    хямдралтай авах боломжтой
                  </p>
                </div>
              </div>
              <div className="flex justify-center mb-[24px] ">
                <Button
                  loading={loading}
                  onClick={() => {
                    router.push(
                      {
                        pathname: `/help/aura`,
                      },
                      `/help/aura`
                    );
                  }}
                  className="bg-caak-primary font-inter font-medium  text-14px text-white"
                >
                  Аура оноо нэмэх арга
                  <span className="icon-fi-rs-next-b ml-[14px] text-11px mt-[3px]" />
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  ) : null;
};

export default AuraModal;
