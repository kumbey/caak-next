import Link from 'next/link';
import React, {useEffect, useState} from 'react';
import { API } from 'aws-amplify';
import { getFileUrl } from '../../utility/Util';
import { listBannersByType } from '../../graphql/queries';

export default function Banner() {
  const [banners, setBanners] = useState([])
  const [number, setNumber] = useState(null);

  useEffect(() => {
    const fetchBannersByType = async () => {
        try{
            const resp = await API.graphql({
                query: listBannersByType,
                variables: {
                    type: 'A2',
                },
                authMode: 'AWS_IAM'
            });
            setBanners(resp.data.listBannersByType.items);
            
        }catch(ex){
            console.log(ex);
        }
    }
    fetchBannersByType()
  },[])

  useEffect(() => {
    setNumber(Math.floor(Math.random() * banners.length));
    // eslint-disable-next-line
  }, [banners]);

  return (
    banners.length > 0 
    ?
    <div className="sticky top-[74px]">
      <a rel="noreferrer" href={JSON.parse(banners[number].meta).url ? JSON.parse(banners[number].meta).url : '/'} target="_blank">
        <img alt="" src={getFileUrl(banners[number].pic1)} className={`rounded-[8px] ${JSON.parse(banners[number].meta).colors.border_color1 ? `border border-[${JSON.parse(banners[number].meta).colors.border_color1}]` : ""} b w-[300px] max-h-[400px] border`} />
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
