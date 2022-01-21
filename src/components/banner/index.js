import Link from 'next/link';
import React, {useEffect, useState} from 'react';
import { API } from 'aws-amplify';
import { getFileUrl } from '../../utility/Util';
import { listBannersByType } from '../../graphql/queries';
import { graphqlOperation } from 'aws-amplify';

export default function Banner() {
    const [banner, setBanner] = useState()
    const [meta, setMeta] = useState()

    const fetchBanners = async () => {
        const resp = await API.graphql(
            graphqlOperation(listBannersByType, {
                type: 'A2',
            })
        );

        const number = Math.floor(Math.random() * resp.data.listBannersByType.items.length)

        setBanner(resp.data.listBannersByType.items[number])
        const data = JSON.parse(resp.data.listBannersByType.items[number].meta);
        setMeta(data);
    };

    useEffect(() => {
        fetchBanners()
    },[])

  return (
    meta 
    ?
    <div className="sticky top-[74px]">
      <a rel="noreferrer" href={meta.url} target="_blank">
        <img alt="" src={getFileUrl(banner.pic1)} className={`rounded-[8px] w-[300px] max-h-[400px] border`} />
      </a>
      <div className='flex flex-row items-center mt-[8px] ml-[10px]'>
        <span className='icon-fi-rs-info text-[14px] text-[#6C7392]'/>
        <p className='text-[13px] text-[#6C7392] ml-[4.6px]'>Caak ads</p>
      </div>
    </div>
    :
    null
  );
}
