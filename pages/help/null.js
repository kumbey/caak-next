import Link from 'next/link'
import React from 'react'
import useHelpLayout from '../../src/hooks/useHelpLayout'

export default function Null() {
    const HelpLayout = useHelpLayout()

    return (
        <HelpLayout>
            <div className='flex flex-col sm:flex-row items-center sm:items-start'>
                <div className="flex flex-col w-[320px] sm:w-[280px] xl:w-[300px] 2xl:w-[320px] max-h-[420px] rounded-[10px] bg-white p-[23px] mb-[20px] sm:mb-0">
                    <Link href="/help" shallow>
                        <a className='flex flex-row items-center'> 
                            <span className='icon-fi-rs-back text-[#FF6600] text-[22px]'/>
                            <p className='text-[15px] font-medium ml-[11px]'>{`Буцах`}</p>
                        </a>
                    </Link>
                </div>
                <div className="w-[340px] sm:w-[400px] md:w-[580px] xl:w-[907px] sm:h-[300px] bg-white sm:ml-[20px] p-[30px] rounded-[10px] flex justify-center items-center">
                    <p className='font-bold text-[30px]'>{`Талбар хоосон байна`}</p>
                </div>
            </div>
        </HelpLayout>
    )
}
