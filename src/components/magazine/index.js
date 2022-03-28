import React from 'react'
import { getFileUrl } from '../../utility/Util'

export default function MagazineItem({data}) {
    return (
        <div className='min-w-[348px] max-w-[348px] h-[227px] relative mr-[21px]'>
            <div className='absolute bg-white z-2 top-0 left-0 w-[338px] h-[219px] rounded-[4px] border-[1px] border-[#D4D8D8]'>
                <img src={getFileUrl(data.items.items[0].file)} className='w-full object-cover h-[89px] rounded-t-[4px]'/>
                <div className='px-[16px] pt-[12px]'>
                    <p className='text-[#111111] text-[18px] font-medium truncate-1'>{data.title}</p>
                    <p className='text-black text-[15px] font-medium'>{data.user.nickname}</p>
                    <p className='mt-[12px] text-[15px] text-[#909090] truncate-2'>Энэхүү жор дээр технологи болон иноваци тухай мэдээнүүдийг оруулах болно.</p>
                </div>
            </div>
            <div className='absolute bg-white z-1 top-[5px] left-[5px] w-[338px] h-[218px] rounded-[4px] border-[1px] border-[#D4D8D8]'>

            </div>
            <div className='absolute z-0 bg-white top-[10px] left-[10px] w-[338px] h-[217px] rounded-[4px] border-[1px] border-[#D4D8D8]'>

            </div>
        </div>
    )
}
