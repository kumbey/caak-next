import React, {useEffect, useState} from 'react';
import { API } from 'aws-amplify';
import { getFileUrl } from '../../utility/Util';
import { listBannersByType } from '../../graphql/queries';
import { getReturnData } from '../../utility/Util';
import { graphqlOperation } from 'aws-amplify';

export default function ModalBanner({bannerOpen, setBannerOpen}) {
    const [modal, setModal] = useState(false)
    const [banner, setBanner] = useState()
    const [meta, setMeta] = useState()
    const [hover, setHover] = useState(false)

    const fetchBanners = async () => {
        const resp = await API.graphql(
            graphqlOperation(listBannersByType, {
                type: 'A1',
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

    const toggleHover = () =>{
        setHover(!hover)
    }

    return (
        bannerOpen && meta
        ?
        <div className="sticky bottom-2/3 sm:bottom-[50px] left-[10px] sm:left-[50px] max-w-[174px]">
            <div className='bounce_banner flex flex-row items-start'>
                <div
                    onMouseEnter={toggleHover}
                    onMouseLeave={toggleHover}
                    style={{borderColor: hover ? meta.colors.border_color1 : meta.colors.border_color2}}
                    onClick={() => setModal(true)} 
                    className={`
                        rounded-[8px] cursor-pointer
                        border-[10px]
                    `}
                >
                    <img alt="" src={getFileUrl(banner.pic2)} className="w-[150px] h-[150px] bg-white" />
                    <p
                        style={{
                            color: hover ? meta.colors.text_hover_color : meta.colors.text_color, 
                            backgroundColor: hover ? meta.colors.text_bg_hover_color : meta.colors.text_bg_color
                        }}
                        className={` 
                            absolute top-1/2 right-0 p-1 rounded-[8px]
                        `}
                    >
                        {meta.text}
                    </p>
                </div>
                <span onClick={() => setBannerOpen(false)} className='cursor-pointer icon-fi-rs-close bg-[#9A9FB4] p-1 rounded-full ml-[8px]'/>
            </div>
            
            {
                modal
                ?
                <div className='popup_modal bg-[rgba(0, 0, 0, 0.5)] '>
                    <div className='popup_modal-banner'>
                        <div className='flex flex-col items-end'>
                            <span onClick={() => setModal(false)}  className='cursor-pointer icon-fi-rs-close bg-[#9A9FB4] p-2 rounded-full'/>
                            <a href={meta.url} className={`mt-[20px] rounded-[8px]`} rel="noreferrer" target="_blank">
                                <img alt="" src={getFileUrl(banner.pic1)} className="rounded-[8px] w-[500px] max-h-[500px]" />
                            </a>
                        </div>
                    </div>
                </div>
                :
                null
            }
        </div>
        :
        null
    )
}
