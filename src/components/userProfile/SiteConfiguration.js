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
    <>
      <p
        className="font-medium"
        style={{
          marginLeft: "30px",
          marginTop: "30px",
          fontSize: "24px",
        }}
      >
        Сайтын тохиргоо
      </p>
      <div style={{ marginTop: "21px" }} className=" border-b">
        <div
          style={{ paddingBlock: "14px" }}
          className="px-c3 flex items-center justify-between w-full border-b"
        >
          <p className="text-16px font-medium">
            Видео бичлэгийг автоматаар тоглуулах
          </p>
          <Switch toggle={toggle} active={active === "true" ? true : false} />
        </div>
      </div>
    </>
  );
}
