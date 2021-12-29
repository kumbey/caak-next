import { useState, useEffect } from "react";

import { API } from "aws-amplify";
import { graphqlOperation } from "@aws-amplify/api-graphql";

import { listReportTypes } from "../../graphql-custom/reportType/queries";
import { createReportedPost } from "../../graphql-custom/reportType/mutation";
import Button from "../button";
import Image from "next/image";
import helloImg from "../../../public/assets/images/Hello.svg";
import auraImg from "../../../public/assets/images/AuraSM.svg";
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
                "  flex  justify-center items-center relative py-[20px] px-[20px] bg-caak-macarooncream rounded-t-xl"
              }
            >
              <div className="flex justify-center h-[180px] w-full ">
                <Image
                  priority={true}
                  className=" bg-white rounded-[10px] bg-transparent"
                  src={helloImg}
                  height={180}
                  layout="fixed"
                  objectFit={"cover"}
                  alt="#"
                />
              </div>
              <div
                onClick={() => setIsOpen(false)}
                className={
                  "flex items-center justify-center w-[30px] h-[30px] rounded-full bg-caak-titaniumwhite absolute right-[0px] top-[0px] cursor-pointer"
                }
              >
                <span className={"icon-fi-rs-close text-[14px]"} />
              </div>
            </div>
            <div className="flex flex-col py-[20px] px-[95px] items-center justify-center  bg-white rounded-b-xl">
              <p className="font-inter font-semibold text-20px text-caak-generalblack text-center mb-[12px]">
                Групп нээхэд таны <br /> Аура оноо хүрэлцэхгүй байна.
              </p>
              <div className="flex items-center">
                <p className=" font-inter font-normal text-15px text-caak-darkBlue  mb-[20px]">
                  Аура оноо
                </p>
                <Image
                  className="  bg-transparent auraGradient"
                  src={auraImg}
                  height={40}
                  width={40}
                  objectFit={"cover"}
                  alt="#"
                />
                <p className="font-inter font-medium text-15px text-caak-primary">
                  500＋
                </p>
                <p> цуглуулсан байх шаардлагатай.</p>
              </div>
              <Button
                loading={loading}
                onClick={() => setIsNext(true)}
                className="bg-caak-primary font-inter font-medium  text-14px text-white"
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
                <Image
                  className=" bg-white rounded-[10px] bg-transparent"
                  src={helloImg}
                  height={180}
                  layout="fixed"
                  objectFit={"cover"}
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
                    Цалинтай нийтлэгч болох
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
