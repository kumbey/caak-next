import { useRouter } from "next/router";

const ViewPostMoreMenu = () => {
  const router = useRouter();
  const postId = router.query.id;
  return (
    <div className={"dropdown-item-wrapper flex flex-col w-full"}>
      <div className="hover:bg-caak-liquidnitrogen h-c25 dropdown-items flex items-center cursor-pointer">
        <div className={"w-[20px] h-[20px] flex items-center justify-center"}>
          <span className={"icon-fi-rs-save-o text-[17px]"} />
        </div>
        <p className="ml-[12px] text-14px text-caak-extraBlack">Хадгалах</p>
      </div>
      <div className="hover:bg-caak-liquidnitrogen h-c25 dropdown-items flex items-center cursor-pointer">
        <div className={"w-[20px] h-[20px] flex items-center justify-center"}>
          <span className={"icon-fi-rs-flag text-[17px]"} />
        </div>
        <p className="ml-[12px] text-14px text-caak-extraBlack">Репорт</p>
      </div>
      <div
        onClick={() =>
          router.push(
            {
              pathname: `/post/edit/${postId}`,
            },
            `/post/edit/${postId}`
          )
        }
        className="hover:bg-caak-liquidnitrogen h-c25 dropdown-items flex items-center cursor-pointer"
      >
        <div className={"w-[20px] h-[20px] flex items-center justify-center"}>
          <span className={"icon-fi-rs-edit text-[17px]"} />
        </div>
        <p className="ml-[12px] text-14px text-caak-extraBlack">Засах</p>
      </div>
    </div>
  );
};

export default ViewPostMoreMenu;
