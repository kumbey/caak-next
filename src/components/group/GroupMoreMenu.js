import { useUser } from "../../context/userContext";
export default function GroupMoreMenu() {
  const { isLogged } = useUser();
  return (
    <div className={"dropdown-item-wrapper"}>
      {isLogged && (
        <div className="hover:bg-caak-liquidnitrogen h-c25 dropdown-items flex items-center cursor-pointer">
          <span className={"icon-fi-rs-add-user-o mr-px-12 w-c1  text-16px"} />
          <p className="text-14px text-caak-extraBlack font-roboto">
            Дагагчаа урих
          </p>
        </div>
      )}
      <div className="hover:bg-caak-liquidnitrogen h-c25 dropdown-items flex items-center cursor-pointer">
        <span className={"icon-fi-rs-pin-o mr-px-12 w-c1  w-c1 text-16px"} />
        <p className="text-14px text-caak-extraBlack font-roboto">
          Группыг онцлох
        </p>
      </div>
      <div className="hover:bg-caak-liquidnitrogen h-c25 dropdown-items flex items-center cursor-pointer">
        <span className={"icon-fi-rs-report mr-px-12 w-c1  text-16px"} />
        <p className="text-14px text-caak-extraBlack font-roboto">Репорт</p>
      </div>
    </div>
  );
}
