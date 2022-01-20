import Link from 'next/link';
import React, {useState} from 'react';

export default function ModalBanner({bannerOpen, setBannerOpen}) {
    const [modal, setModal] = useState(false)
    return (
        bannerOpen ?
        <div className="sticky bottom-8 left-8 w-[100px]">
            <p onClick={() => setBannerOpen(false)} className='cursor-pointer'>close this shit</p>
            <div onClick={() => setModal(true)} className='bg-[#FF6600] w-[100px] h-[100px] cursor-pointer mt-[10px]'>
            
            </div>
            {
                modal
                ?
                <div className='popup_modal bg-transparent'>
                    <div className='popup_modal-banner'>
                        <div className='flex flex-col'>
                            <p onClick={() => setModal(false)} className='cursor-pointer'>close this shit</p>
                            <Link href={"https://playmo.mn/"}>
                                <a target="_blank">
                                    <div>
                                        <p>asd</p>
                                    </div>
                                </a>
                            </Link>
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
