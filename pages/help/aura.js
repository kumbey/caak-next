import Link from 'next/link'
import React from 'react'
import useHelpLayout from '../../src/hooks/useHelpLayout'

export default function Aura() {
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
                            <p className='text-[22px] font-bold'>{`АУРА гэж юу вэ?`}</p>
                            <div className='flex flex-row items-center'>
                                <a rel="noreferrer" href='https://www.facebook.com/caakweb' target="_blank"><span className='icon-fi-rs-facebook border path1 text-[16px]'/></a>
                                <a rel="noreferrer" className='ml-[8px]' href='https://twitter.com/caaktwt' target="_blank"><span className='icon-fi-rs-twitter text-[16px]'/></a>
                                <a rel="noreferrer" className='ml-[8px]' href='https://www.instagram.com/caak.mn/' target="_blank"><span className='icon-fi-rs-ig text-[16px]'/></a>
                            </div>
                        </div>
                        <p>Аура гэдэг нь таны идэвхийн оноо юм. Та хэдий чинээ эерэг гоё мэдрэмжээ бусадтай хуваалцана Аура оноо тань хурдан нэмэгдээд явна. Эсэргээрээ сөрөг байх бүртээ аура оноогоо алдах болно. </p>
                        <div className='border-t mt-[16px] py-[23px] text-[15px]'>
                            <p className='font-bold'>{` Аура оноо өндөр байснаар дараах боломжууд бий болно. `}</p>
                            <ul className='list-disc  ml-[20px]'>
                                <li>{`Шагнал авна`}</li>
                                <li>{`Шилдэг гишүүдийн тоонд орно`}</li>
                                <li>{`Сурталчилгаа явуулах эрхтэй болно`}</li>
                                <li>{`Цалинтай нийтлэгч болно`}</li>
                                <li>{`Контент /зураг, нийтлэл, видео/-оо худалдах эрх нээгдэнэ`}</li>
                            </ul>
                            <p className='font-bold mt-[16px]'>{`Аура оноо хэрхэн нэмэгдэх вэ?`}</p>
                            <ul className='list-disc  ml-[20px]'>
                                <li>{`Пост оруулах бүрт`}</li>
                                <li>{`Пост reaction /саак авах, хадгалах, шэйр/ авахад`}</li>
                                <li>{`Сэтгэгдэл бичих бүрт`}</li>
                                <li>{`Дагагч нэмэгдэх бүрт аура оноо тань нэмэгдээд явна.`}</li>
                            </ul>
                            <p className='font-bold mt-[16px]'>{`Группын Аура:`}</p>
                            <ul className='list-disc  ml-[20px]'>
                                <li>{`Группын постын тоо`}</li>
                                <li>{`Группын гишүүдийн тооноос хамаарч нэмэгдэнэ`}</li>
                            </ul>
                            <p className='font-bold mt-[16px]'>{`Аура оноо хасагдах шалтгаан:`}</p>
                            <ul className='list-disc  ml-[20px]'>
                                <li>{`Нэр төрд халдсан`}</li>
                                <li>{`Зохиогчийн эрх зөрчсөн`}</li>
                                <li>{`Архи, мансууруулах бодис сурталчилсан`}</li>
                                <li>{`Дарамтлах, үзэн ядалт агуулсан`}</li>
                                <li>{`Бүдүүлэг үг, үйлдэл`}</li>
                                <li>{`Садар самуунд уриалсан`}</li>
                                <li>{`Худал мэдээлэл тараасан`}</li>
                                <li>{`Аллага хүчирхийлэлд уриалсан`}</li>
                                <li>{`Спам`}</li>
                                <li>{`Бусад`}</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </HelpLayout>
    )
}
