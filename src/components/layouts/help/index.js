import React from 'react'
import Logo from '../../logo'
import { useUser } from '../../../context/userContext'
import Link from 'next/link'

export default function DefaultHelpLayout({children}) {
    const {user, isLogged} = useUser()
    return (
        <div className='flex flex-col justify-between min-h-screen'>
            <div className='bg-black h-[150px] items-center md:h-[250px] xl:h-[396px] relative flex justify-center'>
                <div className='w-[300px] sm:w-[400px] md:w-[700px] xl:w-[1247px] top-[10px] md:top-[60px] xl:top-[129px] absolute text-white flex flex-col'>
                    <div className=' flex flex-row text-[16px]'>Сайн байна уу? {isLogged ? <p className='ml-[5px]'>{user.nickname === null ? null: user.nickname}</p> : null}</div>
                    <p className='font-semibold text-[25px] md:text-[38px]'>Танд хэрхэн туслах вэ?</p>
                    <input disabled className='w-[300px] sm:w-[400px] xl:w-[616px] h-[44px] bg-white rounded-[4px] text-[#6C7392] px-[40px] ' placeholder='Тусламж хайх'/>
                </div>
            </div>
            <div className={"max-w-[1247px] mx-auto my-[40px] flex items-start justify-start"}>
                {children}
            </div>
            <div className='bg-white h-[200px] sm:h-[155px] flex justify-center'>
                <div className='w-full sm:w-[670px] md:w-[870px] xl:w-[1247px]'>
                    <div className='text-[15px] text-[#6C7392] flex flex-wrap justify-center sm:justify-start gap-[4px] sm:flex-row sm:h-[69px] border-b sm:items-end pb-[18px] border-color:[#F3F3F4]'>
                        <Link href="/help/connectus" shallow>
                            <a>
                                <p>Холбоо барих</p>
                            </a>
                        </Link>
                        <Link href={"/help"} shallow>
                            <a className='sm:ml-[10px] md:ml-[35px]'>
                                <p>Сурталчилгаа</p>
                            </a>
                        </Link>
                        <Link href="/help/secure" shallow>
                            <a className='sm:ml-[10px] md:ml-[35px]'>
                                <p>Үйлчилгээний нөхцөл</p>
                            </a>
                        </Link>
                        <Link href="/help/secure" shallow>
                            <a className='sm:ml-[10px] md:ml-[35px]'>
                                <p>Нууцлал</p>
                            </a>
                        </Link>
                        <Link href="/help" shallow>
                            <a className='sm:ml-[10px] md:ml-[35px]'>
                                <p>Тусламж</p>
                            </a>
                        </Link>
                    </div>
                    <div className='flex flex-row justify-between items-center text-[15px] text-[#6C7392]'>
                        <div className={"flex flex-col sm:flex-row items-center mt-[10px] sm:mt-[25.5px]"}>
                            <Logo/>
                            <p className='ml-[16px]'>©2021 Саак Холдинг ХХК</p>
                        </div>
                        <p>beta version</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
