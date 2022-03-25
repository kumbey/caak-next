import { generateTimeAgo, getFileUrl } from "../../../../utility/Util";
import { useRouter } from "next/router";
import Link from "next/link";
import ActionButtons from "./actionButtons";

const NavbarPostHeaderCard = ({ type, item, index }) => {
  const image = item.items.items[0].file;
  const groupImage = item.group.profile;
  const router = useRouter();
  return (
    <div className={"w-full h-full relative  min-h-[436px]"}>
      <Link
        as={`/post/view/${item.id}`}
        shallow
        href={{
          query: {
            ...router.query,
            viewPost: "post",
            id: item.id,
            prevPath: router.asPath,
            isModal: true,
          },
        }}
      >
        <a>
          <img
            className={"object-cover w-full h-full absolute top-0"}
            alt={image.name}
            src={getFileUrl(image)}
          />
        </a>
      </Link>
      <div
        className={
          "absolute bottom-0 h-full w-full navBarPostHeaderCardGradient"
        }
      />

      <div
        className={`flex flex-col w-full absolute bottom-0 ${
          type === "wide" ? "px-[40px]" : "px-[30px]"
        }  py-[30px] text-white`}
      >
        <p
          className={
            "uppercase text-[14px] font-roboto font-medium tracking-[0.2px] leading-[15px]"
          }
        >
          #Спорт
        </p>
        <Link
          as={`/post/view/${item.id}`}
          shallow
          href={{
            query: {
              ...router.query,
              viewPost: "post",
              id: item.id,
              prevPath: router.asPath,
              isModal: true,
            },
          }}
        >
          <a>
            <p
              className={`${
                type === "wide"
                  ? "text-[40px] md:text-[50px] tracking-[0.4px] md:tracking-[0.5px] leading-[46px] md:leading-[56px]"
                  : "text-[24px] md:text-[32px] tracking-[0.2px] md:tracking-[0.32px] truncate-3 leading-[28px] md:leading-[36px]"
              }  font-bold font-robotoCondensed mt-[10px]`}
            >
              {item.title}
            </p>
          </a>
        </Link>

        <p
          className={
            "text-[14px] font-roboto font-medium tracking-[0.21px] leading-[16px] mt-[14px]"
          }
        >
          {generateTimeAgo(item.createdAt)}
        </p>
        <div
          className={
            "flex flex-col md:flex-row flex-wrap justify-between mt-[30px] items-center"
          }
        >
          <div className={"flex flex-row flex-wrap items-center self-start"}>
            <Link href={`/group/${item.group.id}`}>
              <a>
                <div className={"flex items-center flex-row"}>
                  <img
                    width={22}
                    height={22}
                    src={getFileUrl(groupImage)}
                    alt={item.group.name}
                    className={"w-[22px] h-[22px] rounded-full object-cover"}
                  />

                  <p className={"truncate-1 ml-[6px] text-[14px] font-roboto font-medium tracking-[0.21px] leading-[16px]"}>{item.group.name}</p>
                </div>
              </a>
            </Link>
            &nbsp; &middot; &nbsp;
            <p className={"text-[14px] font-roboto font-medium tracking-[0.21px] leading-[16px]"}>{item.user.nickname}</p>
          </div>
          <div className={"flex items-center mt-[10px] md:mt-0 self-end md:self-center"}>
            <ActionButtons />
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavbarPostHeaderCard;
