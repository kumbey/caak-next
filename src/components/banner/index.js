import Link from 'next/link';
import React, {useEffect, useState} from 'react';
import { API } from 'aws-amplify';
import { getFileUrl } from '../../utility/Util';
import { listBannersByType } from '../../graphql/queries';

export default function Banner() {
  const [banners, setBanners] = useState([])
  const [number, setNumber] = useState(0);

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
}, []);

console.log(number);

  return (
    banners.length > 0 
    ?
    <div className="sticky top-[74px]">
      {/* <a rel="noreferrer" href={banners[number]} target="_blank"> */}
        <img alt="" src={getFileUrl(banners[number].pic1)} className="rounded-[8px] w-[300px] max-h-[400px]" />
        
      {/* </a> */}
    </div>
    :
    null
  );
}
