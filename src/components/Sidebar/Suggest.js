import { generateFileUrl } from "../../utility/Util";

export default function Suggest({ item, onClick }) {
  return (
    <div onClick={onClick} className={"flex flex-col cursor-pointer w-full"}>
      <div className={"flex flex-row items-center p-1.5 my-px rounded-square"}>
        <img
          src={generateFileUrl(item.profile)}
          className={"w-8 h-8 rounded-md object-cover mr-2"}
          alt={""}
        />
        <span
          className={
            "text-caak-generalblack font-medium text-15px break-words"
          }
        >
          {item.name}
        </span>
      </div>
    </div>
  );
}
