import auraImage from "../../../public/assets/images/Aura.svg";
import registerImage from "../../../public/assets/images/Register.png";
import Link from "next/link";
import Image from "next/image";
import { useUser } from "../../context/userContext";
import useHover from "../../hooks/useHover";
import { useRouter } from "next/router";

const AuraCard = () => {
  const { isLogged } = useUser();
  const [hoverRef, isHovered] = useHover();
  const router = useRouter();

  return isLogged ? (
    <div className={`auraCard`}>
      <div
        className={
          "font-bold text-[22px] text-caak-extraBlack text-center h-[33px] tracking-[0.44px] leading-[22px]"
        }
      >
        Аура гэж юу вэ?
      </div>
      <div className={"w-[216px] h-[146px]"}>
        <img
          className={"object-contain"}
          src={auraImage.src}
          alt="What is Aura"
          width={216}
          height={146}
          // objectFit="contain"
        />
      </div>

      <Link shallow href={`/help/aura`}>
        <a>
          <button
            // onClick={() => }
            className={
              "button primary w-[220px] h-[36px] font-medium text-14px"
            }
          >
            Дэлгэрэнгүй
          </button>
        </a>
      </Link>
    </div>
  ) : (
    <div
      style={
        !isLogged
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
        onClick={() => {
          router.push(
            {
              pathname: router.pathname,
              query: {
                ...router.query,
                signInUp: "signUp",
                isModal: true,
              },
            },
            `/signInUp/signUp`,
            { shallow: true }
          );
        }}
        ref={hoverRef}
        className={
          "button w-[280px] h-c9 font-medium text-14px bg-black text-white  hover:bg-caak-extraBlack-hover"
        }
      >
        Бидэнтэй нэгдэх
      </button>
    </div>
  );
};

export default AuraCard;
