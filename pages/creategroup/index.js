import React from 'react'
import Cover from '../../public/assets/images/defaultCover.png'
import Button from '../../src/components/button'

export default function CreateGroup() {
    return (
        <div className='flex flex-row mt-[54px]'>
            <div className='w-[440px] bg-white'>
                <p className='text-[15px] font-inter font-medium text-[#21293C]'>Өмнөх хуудас руу буцах</p>
            </div>
            <div className='bg-white rounded-[8px] h-[801px] ml-[128px] w-[1220px] mt-[40px] p-[30px]'>
                <div className='w-full relative border'>
                    <img alt='' src={Cover.src}/>
                    <div className='absolute top-[128px] left-[80px] w-[148px] h-[148px] rounded-[34px] border-[6px] border-white bg-[#ECEDF1] flex justify-center items-center'>
                        <span className='icon-fi-rs-group-f text-[45px] text-[#9A9FB4]' />
                    </div>
                    <div className='pl-[248px] pr-[162px] h-[110px] w-fill flex flex-row justify-between items-center'>
                        <div>
                            <p className='text-[25px] font-inter font-semibold'>Группын нэр</p>
                            <div className='flex flex-row items-center'>
                                <div className='flex flex-row items-center'>
                                    <span className='icon-fi-rs-aura-o'/>
                                    <p className='text-[14px] ml-[2px]'>Аура</p>
                                </div>
                                <div className='flex flex-row items-center ml-[15px]'>
                                    <span className='icon-fi-rs-group-o'/>
                                    <p className='text-[14px] ml-[2px]'>Гишүүн</p>
                                </div>
                            </div>
                        </div>
                        <div className='flex flex-row items-center'>
                            <Button
                                iconPosition={"left"}
                                icon={
                                <div
                                    className={
                                    "w-[20px] h-[20px] flex items-center justify-center "
                                    }
                                >
                                    <span
                                    className={`icon-fi-rs-add-group-f text-[16px] `}
                                    />
                                </div>
                                }
                                skin={"primary"}
                                className={`bg-[#9A9FB4] text-white h-[36px] w-[120px] rounded-[6px] font-medium text-[15px] tracking-[0.18px] leading-[15px] py-[4px] pr-[12px] pl-[6px]`}
                            >
                                Нэгдэх
                            </Button>
                        </div>
                    </div>
                </div>
                <div className='w-full h-auto bg-[#F3F3F4] flex flex-row'>
                    <div>
                        
                    </div>
                </div>
            </div>
        </div>
    )
}
