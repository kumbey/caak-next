import confusedEmoji from "/public/assets/images/feedback/confused.svg";
import wink from "/public/assets/images/feedback/wink.svg";
import smile from "/public/assets/images/feedback/smile.svg";
import dead from "/public/assets/images/feedback/dead.svg";
import smileHeart from "/public/assets/images/feedback/smileHeart.svg";

import Image from "next/image";
import Input from "../input";
import Button from "../button";
import {useState} from "react";
import {API} from "aws-amplify";
import {createFeedBack} from "../../graphql-custom/feedback/mutations";
import {useUser} from "../../context/userContext";
import toast from "react-hot-toast";

const FeedBack = ({setIsOpen}) => {
  const [title, setTitle] = useState("");
  const [comment, setComment] = useState("");
  const [star, setStar] = useState(4);
  const {isLogged} = useUser();

  const emojis = [
    {id: 0, emoji: dead},
    {id: 1, emoji: confusedEmoji},
    {id: 2, emoji: smile},
    {id: 3, emoji: wink},
    {id: 4, emoji: smileHeart},
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
          },
        },
        authMode: isLogged ? "AMAZON_COGNITO_USER_POOLS" : "AWS_IAM",
      });
      toast.success(`Таны санал амжилттай илгээгдлээ.`);
      setComment("");
      setTitle("");
    }
  };

  return (
    <div
      className={
        "feedBack flex flex-col z-[10] fixed bottom-[78px] md:bottom-[24px] right-[24px] w-[321px] p-[25px]"
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
              <div
                onClick={() => setStar(emoji.id)}
                key={index}
                className={`${
                  star === index ? "mix-blend-normal" : "mix-blend-luminosity"
                } transition-all duration-300 hover:mix-blend-normal  cursor-pointer relative mr-[14px] last:mr-0`}
              >
                <Image alt={""} src={emoji.emoji} height={38} width={38} />
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
                "h-[40px] w-full rounded-[6px] ring-blue-300 border-[1px] border-blue-300 text-[15px] placeholder-caak-aleutian"
              }
              placeholder={"Нэр"}
          />
          <div className={"w-full mt-[10px] relative"}>
            <textarea
                maxLength={500}
                value={comment}
                // defaultValue={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder={"Сэтгэгдэл"}
                className={
                  "h-[102px] w-full rounded-[6px] ring-blue-300 border-[1px] border-blue-300 text-[15px] placeholder-caak-aleutian"
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
  );
};

export default FeedBack;
