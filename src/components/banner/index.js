import Link from 'next/link';
import React, {useEffect, useState} from 'react';
import { API, graphqlOperation } from 'aws-amplify';
import { getFileUrl } from '../../utility/Util';
import { listBannersByTypeOrderByEndDate } from '../../graphql/queries';
import { addViewToItem } from '../../graphql-custom/banner/mutation';
import { getBanner } from '../../graphql/queries';

export default function Banner() {
    const [banner, setBanner] = useState()
    const [meta, setMeta] = useState()

    const date = new Date()
    const now = date.toISOString()

    useEffect(() => {
        const fetch = async () => {
            const resp = await API.graphql({
                query: listBannersByTypeOrderByEndDate,
                variables: {
                  type: 'A2',
                  end_date: {gt: now}
                }, 
                authMode: 'AWS_IAM'
              });
              if (resp.data.listBannersByTypeOrderByEndDate.items.length > 0) {
                const number = Math.floor(Math.random() * resp.data.listBannersByTypeOrderByEndDate.items.length)

                setBanner(resp.data.listBannersByTypeOrderByEndDate.items[number])
                const data = JSON.parse(resp.data.listBannersByTypeOrderByEndDate.items[number].meta);
                setMeta(data);
              }
        };
        fetch()
        // eslint-disable-next-line
    }, [])

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

  return (
    meta && banner
    ?
    <div className="sticky top-[74px] flex flex-col items-end">
      <Link href={meta.url}>
        <a rel="noreferrer" target="_blank">
          <img onClick={() => saveClick()} alt="" src={getFileUrl(banner.pic1)} className={`rounded-[8px] w-[320px] max-h-[400px] border`} />
        </a>
      </Link>
      <Link href='/help/connectus'>
        <a rel="noreferrer" target="_blank" className='flex flex-row items-center mt-[8px] w-[80px]'>
          <span className='icon-fi-rs-info text-[14px] text-[#6C7392]'/>
          <p className='text-[13px] text-[#6C7392] ml-[4.6px]'>Caak ads</p>
        </a>
      </Link>
    </div>
    :
    null
  );
}
