import auraImage from "../../../public/assets/images/Aura.svg";
import registerImage from "../../../public/assets/images/Register.png";

import Image from "next/image";
import { useUser } from "../../context/userContext";
import { checkUser } from "../../utility/Util";
import useHover from "../../hooks/useHover";
import {useEffect, useState} from "react";

const AuraCard = () => {
  const { user } = useUser();
  const [hoverRef, isHovered] = useHover();
  const [logged, setLogged] = useState(false)

  useEffect(() => {
      if(checkUser(user)){
          setLogged(true)
      }
      else {
          setLogged(false)
      }
  },[user])

  return logged ? (
    <div className={`auraCard`}>
      <div
        className={
          "font-bold text-22px text-caak-extraBlack py-px-10 text-center"
        }
      >
        Аура гэж юу вэ?
      </div>

      <Image
        src={auraImage}
        alt="What is Aura"
        width={"216px"}
        height={"146px"}
        objectFit="contain"
      />
      <button
        className={"button primary w-[220px] h-[36px] font-medium text-14px"}
      >
        Дэлгэрэнгүй
      </button>
    </div>
  ) : (
    <div
      style={
        !logged
          ? {
              backgroundImage: `url(${registerImage.src})`,
              backgroundPosition: "center",
              backgroundSize: "contain",
            }
          : {}
      }
      className={"auraCard h-px-280"}
    >
      <div
        className={
          "font-bold text-22px text-caak-extraBlack py-px-10 text-center"
        }
      >
        Шинэ мэдрэмж үүсгэцгээе!
      </div>
      <button
        ref={hoverRef}
        className={
          "button w-[280px] h-c9 font-medium text-14px bg-black text-white  hover:bg-caak-extraBlack-hover"
        }
      >
        {isHovered ? "Бүртгүүлэх" : "Бидэнтэй нэгдэх"}
      </button>
    </div>
  );
};

export default AuraCard;
