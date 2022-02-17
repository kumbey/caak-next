import Link from 'next/link';
import React, {useEffect, useState} from 'react';
import { API, graphqlOperation } from 'aws-amplify';
import { getFileUrl } from '../../utility/Util';
import { listBannersByTypeOrderByEndDate } from '../../graphql/queries';
import { addViewToItem } from '../../graphql-custom/banner/mutation';

export default function Banner() {
  const [banner, setBanner] = useState(null);
  const [meta, setMeta] = useState();

  const date = new Date();
  const now = date.toISOString();

  useEffect(() => {
    const fetch = async () => {
      const resp = await API.graphql({
        query: listBannersByTypeOrderByEndDate,
        variables: {
          type: "A2",
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
      try{
        await API.graphql({
          query: addViewToItem,
          variables: {
            item_id: banner.id,
            on_to: "BANNER",
            type: "VIEWS"
          },
          authMode: 'AWS_IAM'
        })
      }catch(ex){
        console.log(ex)
      }
    }

  return  meta && banner ? (
     <div onClick={()=> saveClick()} className="md:sticky md:top-[74px] relative flex flex-col items-end mb-[10px]">
      <Link href={meta.url}>
        <a className={"w-full"} rel="noreferrer" target="_blank">
          <img
            alt=""
            src={getFileUrl(banner.pic1)}
            className={`rounded-[8px] object-cover w-full min-w-[320px] max-h-[400px] border`}
          />
        </a>
      </Link>
      <Link href={"/help/ads"}>
        <a
          className="flex flex-row items-center mt-[8px] w-[80px]"
        >
          <span className="icon-fi-rs-info text-[14px] text-[#6C7392]" />
          <p className="text-[13px] text-[#6C7392] ml-[4.6px]">Caak ads</p>
        </a>
      </Link>
    </div>
  ) : null;
}
