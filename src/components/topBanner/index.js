import Link from "next/link";
import React, { useEffect, useState } from "react";
import { API } from "aws-amplify";
import { getFileUrl } from "../../utility/Util";
import { listBannersByTypeOrderByEndDate } from "../../graphql/queries";
import { addViewToItem } from "../../graphql-custom/banner/mutation";
import { useRouter } from "next/router";

export default function TopBanner({ location, className }) {
  const [banner, setBanner] = useState(null);
  const [meta, setMeta] = useState();

  const date = new Date();
  const now = date.toISOString();
  const router = useRouter();

  useEffect(() => {
    const fetch = async () => {
      const resp = await API.graphql({
        query: listBannersByTypeOrderByEndDate,
        variables: {
          type: "A3",
          end_date: { gt: now },
        },
        authMode: "AWS_IAM",
      });
      if (resp.data.listBannersByTypeOrderByEndDate.items.length > 0) {
        const number = Math.floor(
          Math.random() * resp.data.listBannersByTypeOrderByEndDate.items.length
        );

        setBanner(resp.data.listBannersByTypeOrderByEndDate.items[number]);
        const data = JSON.parse(
          resp.data.listBannersByTypeOrderByEndDate.items[number].meta
        );
        setMeta(data);
      }
    };
    fetch();
    // eslint-disable-next-line
  }, []);

  const saveClick = async () => {
    try {
      await API.graphql({
        query: addViewToItem,
        variables: {
          item_id: banner.id,
          on_to: "BANNER",
          type: "VIEWS",
        },
        authMode: "AWS_IAM",
      });
    } catch (ex) {
      console.log(ex);
    }
  };

  return meta && banner ? (
    <div
      onClick={() => saveClick()}
      className={` px-[10px] ${className ? className : ""} md:sticky ${
        location === "post" ? "md:top-[16px]" : "md:top-[74px]"
      } relative flex flex-col items-end pb-20 -mt-12`}
    >
      <Link href={meta.url}>
        <a className={"w-full"} rel="noreferrer" target="_blank">
          <img
            width={990}
            height={160}
            alt=""
            src={getFileUrl(banner.pic1)}
            className={`object-cover w-full h-full max-w-[990px] max-h-[160px]`}
          />
        </a>
      </Link>
      {/* <Link href={"/help/ads"}>
        <a
          rel="noreferrer"
          target="_blank"
          className={`${
            router.asPath === "/" ? "text-[#6C7392]" : "text-[#ffffffb8]"
          } flex flex-row items-center mt-[8px] w-[80px]`}
        >
          <span className="icon-fi-rs-megaphone text-[14px]" />
          <p className="text-[13px] ml-[4.6px]">Caak ads</p>
        </a>
      </Link> */}
    </div>
  ) : null;
}
