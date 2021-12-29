import React, {useState} from 'react'
import Image from "next/image";
import post from '../../public/assets/images/blog.png'
import copywriper from '../../public/assets/images/copywriter.png'
import group from '../../public/assets/images/group.png'
import password from '../../public/assets/images/password.png'
import money from '../../public/assets/images/money.png'
import aura from '../../public/assets/images/aura.png'
import useHelpLayout from '../../src/hooks/useHelpLayout'
import Link from 'next/link'

const data1 = [
    {
        title: "Пост оруулах заавар",
        image: post,
        id: 1
    },
    {
        title: "Аура гэж юу вэ?",
        image: aura,
        id: 2
    },
    {
        title: "Хэрхэн бүртгүүлэх вэ?",
        id: 3,
        image: copywriper,
    },
    {
        title: "Нууц үгээ мартсан",
        id: 4,
        image: password,
    },
    {
        title: "Групп үүсгэх",
        id: 5,
        image: group,
    },
    {
        title: "Цалинтай болох",
        id: 6,
        image: money,
    }
]
export default function Help() {

    const HelpLayout = useHelpLayout()

    return (
        <HelpLayout>
            <div className='flex flex-col md:flex-row items-start'>
                <div  className="flex flex-col w-[340px] sm:w-[380px] md:w-[280px] xl:w-[300px] 2xl:w-[320px] max-h-[420px] rounded-[10px] bg-white p-[23px] mb-[20px] md:mb-0">
                    <Link href="/help/aura" shallow>
                        <a className='flex flex-row items-center justify-between'>
                            <div className='flex flex-row items-center'>
                                <span className='icon-fi-rs-auro text-[22px]'/>
                                <p className='ml-[14.5px]'>{`Саак Аура`}</p>
                            </div>
                            <span className='icon-fi-rs-next'/>
                        </a>
                    </Link>
                    <Link href="/help/secure" shallow>
                        <a className='flex flex-row items-center justify-between mt-[28px]'>
                            <div className='flex flex-row items-center'>
                                <span className='icon-fi-rs-info text-[22px]'/>
                                <p className='ml-[14.5px]'>{`Үйлчилгээний нөхцөл болон Нууцлалын бодлого`}</p>
                            </div>
                            <span className='icon-fi-rs-next'/>
                        </a>
                    </Link>
                    <Link href="/help/connectus" shallow>
                        <a className='flex flex-row items-center justify-between mt-[28px]'>
                            <div className='flex flex-row items-center'>
                                <span className='icon-fi-rs-mail-1 text-[22px]'/>
                                <p className='ml-[14.5px]'>{`Холбоо барих`}</p>
                            </div>
                            <span className='icon-fi-rs-next'/>
                        </a>
                    </Link>
                </div>
                <div className="w-[340px] sm:w-[380px] md:w-[460px] lg:w-[620px] xl:w-[907px] bg-white md:ml-[20px] p-[30px] rounded-[10px]">
                    <div className={`flex flex-wrap mt-[22px] justify-between`}>
                        {
                            data1.map(({title, id, image}) => {
                                return(
                                    <Link key={id} shallow href={`${id === 2 ? "/help/aura" : "/help"}`}>
                                        <a>
                                            <div className='flex flex-col items-center w-[135px] sm:w-[150px] md:w-[180px] xl:w-[273px] h-[120px] sm:h-[162px] bg-[#F3F4F6] rounded-[6px] mb-[14px] pt-[15px] sm:pt-[40px]'>
                                                <div className='w-[64px] h-[56px] flex items-center justify-center'>
                                                    <Image alt={""} src={image}/>
                                                </div>
                                                <p className='text-center sm:mt-[16px]'>{title}</p>
                                            </div>
                                        </a>
                                    </Link>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        </HelpLayout>
    )
}
