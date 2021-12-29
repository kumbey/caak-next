import React from 'react'
import Logo from '../../logo'
import { useUser } from '../../../context/userContext'
import Image from 'next/image'

export default function DefaultHelpLayout({children}) {
    const {user, isLogged} = useUser()
    return (
        <div className='flex flex-col justify-between min-h-screen'>
            <div className='bg-black min-w-full h-[250px] xl:h-[396px] relative flex justify-center'>
                <div className='w-full sm:w-[670px] md:w-[870px] xl:w-[1248px] top-[129px] absolute text-white'>
                    <div className=' flex flex-row text-[16px]'>Сайн байна уу? {isLogged ? <p className='ml-[5px]'>Hi</p> : null}</div>
                    <p className='font-semibold text-[38px]'>Танд хэрхэн туслах вэ?</p>
                    <input disabled className='w-[616px] h-[44px] bg-white rounded-[4px] text-[#6C7392] px-[40px] ' placeholder='Тусламж хайх'/>
                </div>
            </div>
            <div className={"max-w-[1247px] mx-auto my-[40px] flex items-start justify-start"}>
                {children}
            </div>
            <div className='bg-white h-[260px] sm:h-[155px] flex justify-center'>
                <div className='w-full sm:w-[670px] md:w-[870px] xl:w-[1248px]'>
                    <div className='text-[15px] text-[#6C7392] flex flex-col sm:flex-row h-auto sm:h-[69px] border-b text-center sm:items-end pb-[18px] border-color:[#F3F3F4]'>
                        <p>Тусламж</p>
                        <p className='sm:ml-[10px] md:ml-[35px]'>Холбоо барих</p>
                        <p className='sm:ml-[10px] md:ml-[35px]'>Сурталчилгаа</p>
                        <p className='sm:ml-[10px] md:ml-[35px]'>Үйлчилгээний нөхцөл</p>
                        <p className='sm:ml-[10px] md:ml-[35px]'>Нууцлал</p>
                    </div>
                    <div className='flex flex-row justify-between items-center'>
                        <div className={"flex flex-col sm:flex-row items-center mt-[25.5px]"}>
                            <Logo/>
                            <p className='text-[15px] text-[#6C7392] ml-[16px]'>©2021 Caak Holding llc</p>
                        </div>
                        <p className='text-[15px] text-[#6C7392]'>beta version</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
