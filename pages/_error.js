import Head from "next/head";
import { useRouter } from "next/router";
import image404 from "../public/assets/images/500/Connection-Lost.gif";
import Button from "../src/components/button";

export default function Error() {
  const router = useRouter()
  return (
    <>
      <Head>
        <title>Сервер дээр алдаа гарлаа.</title>
      </Head>
      <div
        className={
          "flex flex-col items-center justify-center bg-caak-liquidnitrogen min-h-screen w-full h-full"
        }
      >
        <div className={"flex flex-col items-center justify-center"}>
          <img
            alt={""}
            src={image404.src}
            className={"w-[260px] h-[260px]"}
          />
          <p
            className={
              "text-[38px] font-bold text-caak-generalblack mt-[27.5px]"
            }
          >
            Сервер дээр алдаа гарлаа.
          </p>
          <p
            className={
              "text-[16px] text-caak-generalblack mt-[16px] text-center"
            }
          >
            Уучлаарай, Сервер дээрх алдааг нэн даруй засварлахыг хичээж байна.
            Та түр хүлээнэ үү.
          </p>
          <Button
            onClick={() => {
              router.replace("/help/connectus");
            }}
            className={
              "min-w-[246px] h-[44px] tracking-[0.24px] leading-[19px] text-[16px] text-white font-medium mt-[34px]"
            }
            skin={"primary"}
          >
            Тусламжын хуудас руу очих
          </Button>
        </div>
      </div>
    </>
  )
}

Error.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404
  return { statusCode }
}