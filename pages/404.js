import Button from "../src/components/button";
import image404 from '/public/assets/images/404/404.png'
import {useRouter} from "next/router";
import Head from 'next/head'

export default function Custom404() {
  const router  = useRouter()
  return <>
    <Head>
      <title>Хуудас олдсонгүй.</title>
    </Head>
    <div className={"flex flex-col items-center justify-center bg-caak-liquidnitrogen min-h-screen w-full h-full"}>
      <div className={"flex flex-col items-center justify-center"}>
        <img alt={""} src={image404.src} className={"max-w-[640px] w-full h-full"}/>
        <p className={"text-[38px] font-bold text-caak-generalblack mt-[27.5px]"}>
          Хуудас олдсонгүй.
        </p>
        <p className={"text-[16px] text-caak-generalblack mt-[16px] text-center"}>
          Тухайн хуудасны линк устгагдсан эсвэл солигдсон байж болзошгүй.
        </p>
        <Button onClick={()=> {
          router.replace("/")
        }
        } className={"min-w-[246px] h-[44px] tracking-[0.24px] leading-[19px] text-[16px] text-white font-medium mt-[34px]"} skin={"primary"}>
          Нүүр хуудас руу буцах
        </Button>
      </div>
    </div>
  </>
}