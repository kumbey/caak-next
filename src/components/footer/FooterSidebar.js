import Link from "next/link";
const FooterSidebar = ({ containerClassname }) => {
  return (
    <div
      className={`flex flex-col text-12px text-caak-darkBlue ${
        containerClassname ? containerClassname : ""
      }`}
    >
      <div className={"flex flex-wrap my-[4px]"}>
        <Link href="/help/connectus" shallow>
          <a className='sm:ml-[2px] md:ml-[5px]'>
              <p>Холбоо барих</p>
          </a>
        </Link>
        <Link href={"/help"} shallow>
            <a className='sm:ml-[2px] md:ml-[5px]'>
                <p>Сурталчилгаа</p>
            </a>
        </Link>
        <Link href="/help/secure" shallow>
            <a className='sm:ml-[2px] md:ml-[5px]'>
                <p>Үйлчилгээний нөхцөл</p>
            </a>
        </Link>
        <Link href="/help/secure" shallow>
            <a className='sm:ml-[2px] md:ml-[5px]'>
                <p>Нууцлал</p>
            </a>
        </Link>
        <Link href="/help" shallow>
            <a className='sm:ml-[2px] md:ml-[5px]'>
                <p>Тусламж</p>
            </a>
        </Link>
      </div>
      <div className={"my-[4px]"}>©2021 Саак Холдинг ХХК</div>
    </div>
  );
};

export default FooterSidebar;
