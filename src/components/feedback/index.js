import confusedEmoji from "/public/assets/images/feedback/confused.svg";
import wink from "/public/assets/images/feedback/wink.svg";
import smile from "/public/assets/images/feedback/smile.svg";
import dead from "/public/assets/images/feedback/dead.svg";
import smileHeart from "/public/assets/images/feedback/smileHeart.svg";

import Input from "../input";
import Button from "../button";
import { useState } from "react";
import { API } from "aws-amplify";
import { createFeedBack } from "../../graphql-custom/feedback/mutations";
import { useUser } from "../../context/userContext";
import toast from "react-hot-toast";
import FeedbackDoneCard from "./FeedbackDoneCard";

const FeedBack = ({ setIsOpen }) => {
  const [title, setTitle] = useState("");
  const [comment, setComment] = useState("");
  const [type, setType] = useState("");
  const [star, setStar] = useState(4);
  const [isFeedBackSent, setIsFeedbackSent] = useState(false);
  const { isLogged } = useUser();

  const emojis = [
    { id: 0, emoji: dead, desc: "Алдаатай" },
    { id: 1, emoji: confusedEmoji, desc: "Өөрчлөлт хэрэгтэй" },
    { id: 2, emoji: smile, desc: "Дажгүй шүү! гэхдээ..." },
    { id: 3, emoji: wink, desc: "Гоё юмаа" },
    { id: 4, emoji: smileHeart, desc: "Саак" },
  ];

  const feedTypes = [
    {
      value: "DESIGN",
      label: "Дизайн сайжруулалт",
    },
    {
      value: "SYSTEM",
      label: "Системын алдаа",
    },
    {
      value: "CONNECTION",
      label: "Холболтын асууудал",
    },
    {
      value: "IDEA",
      label: "Нэмэлт шинэ санаанууд",
    },
    {
      value: "OTHER",
      label: "Бусад",
    },
  ];

  const sendFeedBack = async () => {
    if (comment !== "") {
      await API.graphql({
        query: createFeedBack,
        variables: {
          input: {
            description: comment,
            title: title,
            star: star,
            status: "CHECKED",
            type: type,
          },
        },
        authMode: isLogged ? "AMAZON_COGNITO_USER_POOLS" : "AWS_IAM",
      });
      toast.success(`Таны санал амжилттай илгээгдлээ.`);
      setComment("");
      setTitle("");
      setType("");
      setIsFeedbackSent(true);
    }
  };

  return !isFeedBackSent ? (
    <div
      className={
        "feedBack flex flex-col z-[10] fixed bottom-[78px] md:bottom-[90px] right-[24px] w-[321px] p-[25px]"
      }
    >
      <div
        onClick={() => setIsOpen(false)}
        className={
          "cursor-pointer w-[30px] h-[30px] bg-white flex items-center justify-center rounded-full absolute top-[12px] right-[12px]"
        }
      >
        <span className={"icon-fi-rs-close text-[14px] text-[#4171FE]"} />
      </div>
      <div className={"mt-[11px] flex flex-col items-center"}>
        <p
          className={
            "text-white self-center font-bold text-[22px] tracking-[0.55px] leading-[26px] text-center"
          }
        >
          Шинэ Саак <br />
          Таны сэтгэгдэлд?
        </p>
        <div className={"flex flex-row items-center mt-[18px]"}>
          {emojis.map((emoji, index) => {
            return (
              <div key={index} className="group relative">
                <div
                  onClick={() => setStar(emoji.id)}
                  className={` ${
                    star === index ? "mix-blend-normal" : "mix-blend-luminosity"
                  } transition-all duration-300 hover:mix-blend-normal  cursor-pointer relative mr-[14px] last:mr-0   ease-in-out delay-50 bg-blue-500 hover:scale-110 hover:bg-indigo-500 rounded-full `}
                >
                  <img alt={""} src={emoji.emoji.src} height={38} width={38} />
                </div>
                <div className="h-[18px] w-auto absolute top-[40px] left-1/2 -translate-x-1/2 hidden group-hover:block bg-caak-generalblack bg-opacity-40 rounded-full px-[12px] my-[2px] items-center shadow-dropdown">
                  <p className="font-inter font-normal tracking-[0.2px] leading-4 text-13px text-white w-auto text-center whitespace-nowrap">
                    {emoji.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
        <div className={"flex flex-col items-center mt-[25px] w-full"}>
          <Input
            // defaultValue={title}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            hideError
            hideLabel
            className={
              "h-[40px] w-full rounded-[6px] ring-blue-300 border-[1px] border-blue-300 text-[15px] placeholder-caak-aleutian mb-[10px]"
            }
            placeholder={"Гарчиг"}
          />
          <select
            className=" form-select appearance-none block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid rounded transitions ease-in-out m-0 ring-blue-300  border-blue-300 text-[15px] placeholder-caak-aleutian"
            aria-label="Default select example"
            onChange={(e) => setType(e.target.value)}
          >
            <option className="" selected hidden>
              Төрөл /Таны сонголт/
            </option>
            {feedTypes.map((feed, index) => {
              return (
                <option key={index} value={feed.value}>
                  0{index + 1}: {feed.label}
                </option>
              );
            })}
          </select>
          <div className={"w-full mt-[10px] relative"}>
            <textarea
              maxLength={500}
              value={comment}
              // defaultValue={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder={"Сэтгэгдэл"}
              className={
                "h-[102px] w-full rounded-[6px] ring-blue-300 border-[1px] border-blue-300 text-[15px] placeholder-caak-aleutian pb-4"
              }
            />
            <div
              className={
                "text-[12px] font-medium absolute bottom-[9px] right-[12px] text-darkblue"
              }
            >
              {comment.length}/500
            </div>
          </div>
          <div className={"mt-[24px]"}>
            <Button
              onClick={() => sendFeedBack()}
              className={
                "w-[130px] h-[36px] self-center rounded-[8px] bg-white text-caak-generalblack font-medium text-[16px]"
              }
            >
              Илгээх
            </Button>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <FeedbackDoneCard />
  );
};

export default FeedBack;
