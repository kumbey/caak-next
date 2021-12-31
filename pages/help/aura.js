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
                        <div>
                            <a rel="noreferrer" href='https://www.facebook.com/caakweb' target="_blank"><span  className='icon-fi-rs-fb text-[16px]'/></a>
                            <a rel="noreferrer" className='ml-[8px]' href='https://twitter.com/caaktwt' target="_blank"><span className='icon-fi-rs-tw text-[16px]'/></a>
                            <a rel="noreferrer" className='ml-[8px]' href='https://www.instagram.com/caak.mn/' target="_blank"><span className='icon-fi-rs-ig text-[16px]'/></a>
                        </div>
                    </div>
                    <div className='border-t mt-[16px] py-[23px] text-[15px]'>
                        <p className='font-bold'>{`Аура гэдэг нь таны идэвхийн оноо юм. Таны аура оноо өндөр байвал дараах давуу талтай.`}</p>
                        <ul className='list-disc  ml-[20px]'>
                            <li>{`Шагнал авах`}</li>
                            <li>{`Пост бүүстлэх эрх`}</li>
                            <li>{`Орлоготой нийтлэгч болох`}</li>
                            <li>{`Харилцагч байгууллагуудын бүтээгдэхүүн, үйлчилгээг хямдралтай авах`}</li>
                        </ul>
                        <p className='font-bold mt-[16px]'>{`Аура оноогоо нэмэх`}</p>
                        <ul className='list-disc  ml-[20px]'>
                            <li>{`Бүртгүүлэх`}</li>
                            <li>{`Сонирхсон групптээ нэгдэх`}</li>
                            <li>{`Оруулсан постын тоо`}</li>
                            <li>{`Постын хандалт`}</li>
                            <li>{`Группын гишүүдийн тоо`}</li>
                            <li>{`Сэтгэгдэл бичих`}</li>
                            <li>{`Профайлын мэдээлэл, зургаа бүрэн оруулах`}</li>
                            <li>{`Утасны дугаараа бүртгүүлэх`}</li>
                        </ul>
                        <p className='font-bold mt-[16px]'>{`Аура оноо хасагдах`}</p>
                        <ul className='list-disc  ml-[20px]'>
                            <li>{`Хувь хүн, байгууллагын төрд халдах`}</li>
                            <li>{`Спам, сурталчилгааны пост оруулах`}</li>
                            <li>{`Садар самуун, архи дарс дарс сурталчилсан пост оруулах`}</li>
                            <li>{`Гэмт хэрэгт уруу татах зэрэг саакын дүрмийг зөрчих бүрт аура оноо хасагдана`}</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        </HelpLayout>
    )
}
