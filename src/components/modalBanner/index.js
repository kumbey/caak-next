import React, {useEffect, useState} from 'react';
import { API } from 'aws-amplify';
import { getFileUrl } from '../../utility/Util';
import { listBannersByType } from '../../graphql/queries';

export default function ModalBanner({bannerOpen, setBannerOpen}) {
    const [modal, setModal] = useState(false)
    const [banner, setBanner] = useState()
    const [meta, setMeta] = useState()
    const [hover, setHover] = useState(false)
    const [swap, setSwap] = useState(false)

    const fetchBanners = async () => {
        const resp = await API.graphql({
            query: listBannersByType,
            variables: {
              type: 'A1',
              
            }, 
            authMode: 'AWS_IAM'
          });

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

    useEffect(() => {
        if(swap === false){
            setTimeout(() => {
                setSwap(true)
            }, 2000)
        }else{
            setTimeout(() => {
                setSwap(false)
            }, 2000)
        }
    }, [swap])

    return (
        bannerOpen && meta
        ?
        <div className="sticky bottom-2/3 sm:top-[80px] sm:bottom-[50px] left-[10px] sm:left-[50px] max-w-[114px] sm:max-w-[174px]">
            {
                modal
                ?
                null
                :
                <div className='bounce_banner flex flex-row items-start'>
                    <div
                        onMouseEnter={toggleHover}
                        onMouseLeave={toggleHover}
                        style={{borderColor: swap ? meta.colors.border_color2 : meta.colors.border_color1}}
                        onClick={() => setModal(true)} 
                        className={`
                            rounded-[8px] cursor-pointer border-[5px] sm:border-[10px]
                        `}
                    >
                        <img alt="" src={getFileUrl(banner.pic2)} className="w-[80px] h-[80px] sm:w-[130px] sm:h-[130px]" />
                        <p
                            style={{
                                color: hover ? meta.colors.text_hover_color : meta.colors.text_color, 
                                backgroundColor: hover ? meta.colors.text_bg_hover_color : meta.colors.text_bg_color
                            }}
                            className={` 
                                absolute top-1/2 right-0 p-1 rounded-[8px] max-w-[60px] text-center max-h-[60px]
                            `}
                        >
                            {meta.text}
                        </p>
                    </div>
                    <span onClick={() => setBannerOpen(false)} className='cursor-pointer icon-fi-rs-close bg-[#9A9FB4] p-1 rounded-[6px]'/>
                </div>
            }
            {
                modal
                ?
                <div className='popup_modal bg-[rgba(0, 0, 0, 0.5)] '>
                    <div className='popup_modal-banner'>
                        <div className='flex flex-col items-end mx-[20px] sm:mx-0'>
                            <span onClick={() => setModal(false)}  className='cursor-pointer icon-fi-rs-close bg-[#9A9FB4] p-2 rounded-full'/>
                            <a href={meta.url} className={`mt-[10px]`} rel="noreferrer" target="_blank">
                                <img style={{height: (screen.width - 20)}} alt="" src={getFileUrl(banner.pic1)} className={`w-[500px] sm:max-h-[500px]`} />
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
