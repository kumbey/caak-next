import Link from 'next/link';
import React, {useEffect, useState} from 'react';
import { API } from 'aws-amplify';
import { getFileUrl } from '../../utility/Util';
import { listBannersByType } from '../../graphql/queries';

export default function ModalBanner({bannerOpen, setBannerOpen}) {
    const [modal, setModal] = useState(false)
    const [banners, setBanners] = useState([])
    const [number, setNumber] = useState(null);
    const [meta, setMeta] = useState();

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
        // eslint-disable-next-line
    }, [banners]);

    useEffect(() => {
        try{
            if(banners.length > 0) {
                const meta = JSON.parse(banners[number].meta)
                setMeta(meta)
            }
        }catch(ex){
            console.log(ex);
        }
    }, []);

    return (
        bannerOpen ?
        banners.length > 0
        ?
        <div className="sticky bottom-[50px] left-[50px] max-h-[150px] max-w-[170px] flex flex-row items-start">
            <div onClick={() => setModal(true)} className={`rounded-[8px] ${JSON.parse(banners[number].meta).colors.border_color1 ? `border border-[${JSON.parse(banners[number].meta).colors.border_color1}]`: ''}  w-[150px] max-h-[150px] cursor-pointer`}>
                <img alt="" src={getFileUrl(banners[number].pic2)} className="rounded-[8px] w-[150px] max-h-[150px] bg-white" />
            </div>
            <span onClick={() => setBannerOpen(false)} className='cursor-pointer icon-fi-rs-close bg-[#9A9FB4] p-1 rounded-full ml-[8px]'/>
            {
                modal
                ?
                <div className='popup_modal bg-transparent '>
                    <div className='popup_modal-banner'>
                        <div className='flex flex-col items-end'>
                            <span onClick={() => setModal(false)}  className='cursor-pointer icon-fi-rs-close bg-[#9A9FB4] p-2 rounded-full'/>
                            <a href={JSON.parse(banners[number].meta).url ? JSON.parse(banners[number].meta).url : '/'} className={`mt-[20px] rounded-[8px] ${JSON.parse(banners[number].meta).colors.border_color1 ? `border border-[${JSON.parse(banners[number].meta).colors.border_color1}]`: ''}`} target="_blank">
                                <img alt="" src={getFileUrl(banners[number].pic1)} className="rounded-[8px] w-[500px] max-h-[500px]" />
                            </a>
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
