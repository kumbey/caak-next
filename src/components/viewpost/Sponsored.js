import CardHeader from "../card/FeedCard/CardHeader";
import { getFileUrl } from "../../utility/Util";
import { useInView } from "react-intersection-observer";
import { useEffect, useState } from "react";
import {API} from "aws-amplify";
import {addViewToItem} from "../../graphql-custom/post/mutation";
import Link from "next/link";

const Sponsored = ({ item }) => {
  const [animationState, setAnimationState] = useState({
    transform: "scale(0)",
    opacity: 0,
  });
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const countReach = async () => {
    await API.graphql({
      query: addViewToItem,
      variables: {
        item_id: item.id,
        on_to: "POST",
        type: "REACH",
      },
      authMode: "AWS_IAM",
    });
  };

  const countViews = async () => {
    await API.graphql({
      query: addViewToItem,
      variables: {
        item_id: item.id,
        on_to: "POST",
        type: "VIEWS",
      },
      authMode: "AWS_IAM",
    });
  };

  useEffect(() => {
    if (inView) {
      countReach()
      setAnimationState({
        transform: "scale(1)",
        opacity: 1,
      });
    }
    //eslint-disable-next-line
  }, [inView]);
  return (
    <div
      onClick={()=> countViews()}
      style={{
        transition: "all 0.5s ease",
        ...animationState,
        transformStyle: "preserve-3d",
      }}
      ref={ref}
      className={
        "flex justify-between min-w-[320px] flex-col w-full h-full max-w-[500px] max-h-[500px] bg-white mb-[40px] mx-auto rounded-[8px] border-[1px] border-[#CDCFD9]"
      }
    >
      <CardHeader sponsored post={item} />
      <a rel={"noreferrer"} target={"_blank"} href={`/post/view/${item.id}`}>
        <img
          width={500}
          height={320}
          className={"object-cover w-[500px] h-[320px]"}
          alt={item.items.items[0].file.name}
          src={getFileUrl(item.items.items[0].file)}
        />
      </a>
      <div
        className={
          "flex justify-end items-center px-[14px] py-[12px] h-[40px] rounded-b-[8px] self-end"
        }
      >
        <Link href="/boost">
          <a>
            <p className={"text-[13px] text-caak-darkBlue"}>Caak Ads</p>
          </a>
        </Link>
      </div>
    </div>
  );
};

export default Sponsored;
