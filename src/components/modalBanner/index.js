import Link from 'next/link';
import React, {useEffect, useState} from 'react';
import { API } from 'aws-amplify';
import { getFileUrl } from '../../utility/Util';
import { listBannersByType } from '../../graphql/queries';

export default function ModalBanner({bannerOpen, setBannerOpen}) {
    const [modal, setModal] = useState(false)
    const [banners, setBanners] = useState([])
    const [number, setNumber] = useState(0);
    

    useEffect(() => {
        const fetchBannersByType = async () => {
            try{
                const resp = await API.graphql({
                    query: listBannersByType,
                    variables: {
                        type: 'A1',
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

    return (
        bannerOpen ?
        banners.length > 0
        ?
        <div className="sticky bottom-8 left-8 w-[100px] flex flex-col items-end">
            <span onClick={() => setBannerOpen(false)} className='cursor-pointer icon-fi-rs-close bg-[#6C7392] p-2 rounded-full'/>
            <div onClick={() => setModal(true)} className='border w-[100px] h-[100px] cursor-pointer mt-[10px]'>
                <img alt="" src={getFileUrl(banners[number]?.pic2)} className="rounded-[8px] w-[100px] h-[100px] " />
            </div>
            {
                modal
                ?
                <div className='popup_modal bg-transparent z-auto'>
                    <div className='popup_modal-banner'>
                        <div className='flex flex-col items-end'>
                            <span onClick={() => setModal(false)}  className='cursor-pointer icon-fi-rs-close bg-[#6C7392] p-2 rounded-full'/>
                            <Link href={"https://playmo.mn/"}>
                                <a className='mt-[20px]' target="_blank">
                                    <img alt="" src={getFileUrl(banners[number]?.pic1)} className="rounded-[8px] w-[500px]" />
                                </a>
                            </Link>
                        </div>
                    </div>
                </div>
                :
                null
            }
        </div>
        :null
        :
        null
    )
}
