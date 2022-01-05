import React, { useState, useEffect } from 'react'
import { listGroups } from '../../src/graphql/queries'
import { API, graphqlOperation } from 'aws-amplify'
import Image from 'next/image'
import Cover from '../../public/assets/images/groups.jpeg'
import SearchCardGroup from '../../src/components/card/SearchCardGroup'
import SuggestedGroupsCard from '../../src/components/card/SuggestedGroupsCard'
import Loader from '../../src/components/loader'
import { listCategorys } from '../../src/graphql/queries'
import { useUser } from '../../src/context/userContext'

const button = [
    {
        title: "Зөвхөн таньд",
        icon: "icon-fi-rs-love-f",
        icon1: "icon-fi-rs-love-o",
        id: 1
    },
    {
        title: "Трэнд болж буй",
        icon: "icon-fi-rs-flash-f",
        icon1: "icon-fi-rs-flash-o",
        id: 2
    },
    {
        title: "Бидний санал болгосон",
        icon: "icon-fi-rs-new-f",
        icon1: "icon-fi-rs-new-o",
        id: 3
    },
]

export default function AllGroups() {
    const [activeIndex, setActiveIndex] = useState(1)
    const [groups, setGroups] = useState([])
    const [id, setId] = useState(null)
    const [category, setCategory] = useState([])
    const [loading, setLoading] = useState(true)
    const {isLogged} = useUser()

    useEffect(() => {
        const fetchGroups = async () => {
            try {
                const resp = await API.graphql({
                    query: listGroups,
                    variables: {
                        filter: id ? {category_id: {eq: id}} : null,
                    },  
                    authMode: isLogged ? 'AMAZON_COGNITO_USER_POOLS' : 'AWS_IAM',
                });
                setGroups(resp.data.listGroups.items)
                setLoading(false)
            } catch (ex) {
                console.log(ex);
            }
        };
        const fetchCategory = async () => {
            try {
                const resp = await API.graphql({
                    query: listCategorys,
                    authMode: 'AWS_IAM'
                });
                setCategory(resp.data.listCategorys.items)
                setLoading(false)
            } catch (ex) {
                console.log(ex);
            }
        };
        
        fetchGroups()
        fetchCategory()
    }, [isLogged, id])
    

    return (
        <div className='flex flex-col items-center mb-[50px]'>
            <div className='relative flex justify-center min-h-[100px]'>
                <Image src={Cover} alt=''/>
                <div className='absolute text-white top-[10px] md:top-[25px] xl:top-[70px] 2xl:top-[100px]'>
                    <p className='xl:text-[30px] font-medium text-center'>Өөрийн дуртай грүппээ олоорой</p>
                    <p className='text-[12px] text-center'>Инээдэм, Видео тоглоом гэх мэт төрлийн грүддүүдийг танд хүргэж байна.</p>
                    <input disabled className='w-[300px] hidden sm:block sm:w-[400px] xl:w-[550px] h-[44px] bg-white rounded-[4px] mt-[10px] md:mt-[20px] xl:mt-[30px] text-[#6C7392] px-[25px] ' placeholder='Хайлт хийх'/>
                </div>
            </div>
            <div className='flex flex-col w-full px-[30px] sm:w-[720px] lg:w-[1028px] xl:w-[1336px]'>
                <div className='mt-[10px] sm:mt-[40px]'>
                    <div className='flex flex-col sm:flex-row items-center'>
                        {
                            button.map(({title, icon, icon1, id}) => {
                                return(
                                    <div key={title} onClick={() => {
                                        setActiveIndex(id)
                                        setId(null)
                                    }} className={`px-[3px] lg:px-[20px] rounded-[8px] cursor-pointer mr-[8px] bg-${activeIndex === id && 'white'} h-[36px] flex flex-row justify-center items-center justify-center`}>
                                        <span className={`${activeIndex === id ? icon : icon1} text-[${activeIndex === id && "#FF6600"}]`} />
                                        <p className={`ml-[6px] font-inter font-medium text-[15px] text-[${activeIndex === id && "#FF6600"}]`}>{title}</p>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
                <div className='flex flex-row'>
                    <div className='flex flex-wrap w-full justify-center sm:justify-start mt-[20px]'>
                        {
                            loading
                            ?
                            <Loader className={`bg-caak-primary self-center`} />
                            :
                            groups.length === 0
                            ?
                            <div>Тус төрөлд хамаарах грүпп байхгүй байна.</div>
                            :
                            groups.map((data, index) => {
                                return(
                                    <SearchCardGroup key={index} result={data}/>
                                )
                            })
                        }
                    </div>
                    <div className='flex flex-col hidden sm:block mt-[20px] ml-[32px]'>
                        <div className='bg-white pb-[10px] mb-[20px] w-[320px] rounded-[8px]'>
                            <p className='h-[45px] flex items-center border-b pl-[18px] font-semibold font-inter text-[15px]'>Группын төрлүүд</p>
                            {
                                category.map((data, index) => {
                                    return(
                                        <div onClick={() => {
                                            setLoading(true)
                                            setId(data.id)
                                            setLoading(false)
                                            setActiveIndex(0)
                                        }} key={index} className={`py-[9.5px] pl-[18px] font-inter text-[15px] text-[#0D1026] flex flex-row cursor-pointer bg-[${data.id === id ? "#6C7392" : "transparent"}]`}>
                                            <span>{data.icon}</span>
                                            <p className='ml-[8px]'>{data.name}</p>
                                        </div>
                                    )
                                })
                            }
                        </div>
                        <SuggestedGroupsCard
                            maxColumns={10}
                            title={"Санал болгох группүүд"}
                            className={"mb-[24px]"}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}
