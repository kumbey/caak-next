import { useEffect, useState } from "react";
import Switch from "./Switch";

export default function SiteConfiguration() {
  const local = localStorage.getItem("autoPlay");
  const [active, setActive] = useState(local ? local : "false");

  const toggle = () => {
    setActive(active === "true" ? "false" : "true");
  };

  useEffect(() => {
    localStorage.setItem("autoPlay", active === "true" ? "true" : "false");
  }, [active]);

  return (
    <div className="flex flex-col mt-[30px] mb-[70px] mx-[30px]">
      <p className="font-semibold text-caak-aleutian font-inter text-22px mb-[10px]">
        Сайтын тохиргоо
      </p>
      <div
        style={{ paddingBlock: "14px" }}
        className=" flex items-center justify-between w-full border-b"
      >
        <p className="text-15px font-normal">
          Видео бичлэгийг автоматаар тоглуулах
        </p>
        <Switch toggle={toggle} active={active === "true" ? true : false} />
      </div>
    </div>
  );
}
