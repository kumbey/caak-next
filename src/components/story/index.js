import React from 'react'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import { generateTimeAgo, getFileUrl } from '../../utility/Util'
import Link from 'next/link'
import {useRouter} from 'next/router'

export default function Story({story}) {
    const router = useRouter()
    return (
        <Link
            as={`/post/view/${story.id}`}
            shallow
            href={{
                query: {
                ...router.query,
                viewPost: "post",
                id: story.id,
                prevPath: router.asPath,
                isModal: true,
                },
            }}
        >
            <a>
                <div className='w-[290px] storyLinear h-[435px] relative mr-[13px]'>
                    <LazyLoadImage
                        alt={story.items.items[0].file.name}
                        className={`object-cover w-full h-full rounded-[4px]`}
                        src={getFileUrl(story.items.items[0].file)}
                    />
                    <div className='absolute bottom-0 py-[30px] px-[20px] flex flex-col items-start'>
                        <p className='bg-[#FF6600] px-[8px] py-[4px] text-white text-[12px] font-bold uppercase'>#category</p>
                        <p className='truncate-3 text-white text-[24px] font-bold mt-[10px]'>{story.title}</p>
                        <p className='text-white text-[14px] font-medium mt-[10px]'>{generateTimeAgo(story.createdAt)}</p>
                    </div>
                </div>
            </a>
        </Link>
    )
}
