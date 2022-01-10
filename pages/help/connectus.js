import Link from 'next/link'
import React from 'react'
import useHelpLayout from '../../src/hooks/useHelpLayout'

export default function ConnectUs() {
    const HelpLayout = useHelpLayout()
    return (
        <HelpLayout>
        <div className='flex flex-col sm:flex-row items-center sm:items-start'>
            <div className="flex flex-col w-[320px] sm:w-[280px] xl:w-[300px] 2xl:w-[320px] max-h-[420px] rounded-[10px] bg-white p-[23px] mb-[20px] sm:mb-0">
                <Link href="/help" shallow>
                    <a className='flex flex-row items-center'> 
                        <span className='icon-fi-rs-back text-[#FF6600] text-[22px]'/>
                        <p className='text-[15px] font-medium ml-[8px]'>{`Буцах`}</p>
                    </a>
                </Link>
            </div>
            <div className="w-[340px] sm:w-[400px] md:w-[580px] xl:w-[907px] bg-white sm:ml-[20px] p-[30px] rounded-[10px]">
                <div>
                    <div className='flex flex-row items-center justify-between'>
                        <p className='text-[22px] font-bold'>{`Холбоо барих`}</p>
                        <div>
                            <a rel="noreferrer" href='https://www.facebook.com/caakweb' target="_blank"><span  className='icon-fi-rs-fb text-[16px]'/></a>
                            <a rel="noreferrer" className='ml-[8px]' href='https://twitter.com/caaktwt' target="_blank"><span className='icon-fi-rs-tw text-[16px]'/></a>
                            <a rel="noreferrer" className='ml-[8px]' href='https://www.instagram.com/caak.mn/' target="_blank"><span className='icon-fi-rs-ig text-[16px]'/></a>
                        </div>
                    </div>
                    <div className='border-t mt-[16px] py-[23px]'>
                        <div className='flex flex-row items-center'>
                            <span className='icon-fi-rs-mail'/>
                            <p className='text-[15px] ml-[10px]'>{`marketing@caak.mn`}</p>
                        </div>
                        <div className='flex flex-row items-center'>
                            <span className='icon-fi-rs-phone'/>
                            <p className='text-[15px] ml-[10px]'>{`72728008`}</p>
                        </div>
                        <div className='flex flex-row items-center'>
                            <span className='icon-fi-rs-location'/>
                            <p className='text-[15px] ml-[10px]'>{`Улаанбаатар, Хан-Уул дүүрэг, 11-р хороо, 121-р байр 102 тоот`}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </HelpLayout>
    )
}
