import Link from "next/link";
const FooterSidebar = ({ containerClassname, banner, topItemHeight }) => {

  const day = new Date();
  const year = day.getFullYear();

  return (
    <div
      style={{
        ...(banner
          ? { position: "sticky", top: `calc(${topItemHeight} + 20px)` }
          : {}),
      }}
      className={`flex flex-col text-12px font-normal text-caak-darkBlue ${
        containerClassname ? containerClassname : ""
      }`}
    >
      <div className={"flex flex-wrap my-[4px]"}>
        <Link href="/help" shallow>
          <a>
            <p>· Тусламж</p>
          </a>
        </Link>
        <Link href="/help/connectus" shallow>
          <a className="ml-[10px]">
            <p>· Холбоо барих</p>
          </a>
        </Link>
        <Link href={"/help/ads"} shallow>
          <a rel="noreferrer" target="_blank">
            <p>· Сурталчилгаа</p>
          </a>
        </Link>
        <Link
          href={{
            pathname: "/help/secure",
            query: {
              index: 1,
            },
          }}
          shallow
        >
          <a className="ml-[10px]">
            <p>· Үйлчилгээний нөхцөл</p>
          </a>
        </Link>
        <Link
          href={{
            pathname: "/help/secure",
            query: {
              index: 2,
            },
          }}
          shallow
        >
          <a className="">
            <p>· Нууцлал</p>
          </a>
        </Link>
      </div>
      <div className={"my-[4px]"}>{`©${year} "Саак Холдинг" ХХК`}</div>
    </div>
  );
};

export default FooterSidebar;
