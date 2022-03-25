import React from 'react'
import { getFileUrl } from '../../utility/Util'

export default function TopTags({data}) {
    console.log(data)
    return (
        <div className='min-w-[150px] max-w-[150px] h-[96px] bg-black-20 mr-[13px] relative'>
            <img className='h-full w-full object-cover rounded-[4px]' alt='' src={getFileUrl(data.picture)}/>
            <p className='absolute top-[14px] left-[14px] text-white text-[18px] font-bold'>#{data.name}</p>
        </div>
    )
}
