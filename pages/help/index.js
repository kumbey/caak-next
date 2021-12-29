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
        icon: "icon-fi-rs-aura-o",
        image: post,
        id: 1
    },
    {
        title: "Аура гэж юу вэ?",
        icon: "icon-fi-rs-aura-o",
        image: aura,
        id: 2
    },
    {
        title: "Хэрхэн бүртгүүлэх вэ?",
        icon: "icon-fi-rs-profile",
        id: 3,
        image: copywriper,
    },
    {
        title: "Нууц үгээ мартсан",
        icon: "icon-fi-rs-safety",
        id: 4,
        image: password,
    },
    {
        title: "Групп үүсгэх",
        icon: "icon-fi-rs-warning-1",
        id: 5,
        image: group,
    },
    {
        title: "Цалинтай болох",
        icon: "icon-fi-rs-report",
        id: 6,
        image: money,
    }
]
export default function Help() {

    const HelpLayout = useHelpLayout()

    return (
        <HelpLayout>
            <div className='flex flex-col sm:flex-row items-start'>
                <div  className="flex flex-col w-[320px] sm:w-[280px] xl:w-[300px] 2xl:w-[320px] max-h-[420px] rounded-[10px] bg-white p-[23px] mb-[20px] sm:mb-0">
                    <Link href="/help/aura" shallow>
                        <a className='flex flex-row items-center justify-between'>
                            <div className='flex flex-row items-center'>
                                <span className='icon-fi-rs-auro text-[22px]'/>
                                <p className='ml-[14.5px]'>Саак Аура</p>
                            </div>
                            <span className='icon-fi-rs-next'/>
                        </a>
                    </Link>
                    <Link href="/help/secure" shallow>
                        <a className='flex flex-row items-center justify-between mt-[28px]'>
                            <div className='flex flex-row items-center'>
                                <span className='icon-fi-rs-info text-[22px]'/>
                                <p className='ml-[14.5px]'>Үйлчилгээний нөхцөл болон Нууцлалын бодлого</p>
                            </div>
                            <span className='icon-fi-rs-next'/>
                        </a>
                    </Link>
                    <Link href="/help/connectus" shallow>
                        <a className='flex flex-row items-center justify-between mt-[28px]'>
                            <div className='flex flex-row items-center'>
                                <span className='icon-fi-rs-mail-1 text-[22px]'/>
                                <p className='ml-[14.5px]'>Холбоо барих</p>
                            </div>
                            <span className='icon-fi-rs-next'/>
                        </a>
                    </Link>
                </div>
                <div className="w-[340px] sm:w-[400px] md:w-[580px] xl:w-[907px] bg-white sm:ml-[20px] p-[30px] rounded-[10px]">
                    <div className={`flex flex-wrap mt-[22px] justify-between`}>
                        {
                            data1.map(({title, id, icon, image}) => {
                                return(
                                    <Link key={id} shallow href={`${id === 2 ? "/help/aura" : "/help/null"}`}>
                                        <a>
                                        <div className='flex flex-col items-center justify-center w-[135px] sm:w-[160px] xl:w-[273px] h-[162px] bg-[#F3F4F6] rounded-[6px] mb-[14px]'>
                                        {
                                            image
                                            ?
                                            <Image  className='w-[64px] h-[56px]' src={image}/>
                                            :
                                            <span className={icon} />
                                        }
                                        {title}
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
