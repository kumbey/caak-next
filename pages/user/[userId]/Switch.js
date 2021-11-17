import { useState } from "react";
export default function Switch() {
  const [active, setActive] = useState();
  return (
    <label
      onClick={() => setActive(!active)}
      style={{ minWidth: "40px", height: "22px" }}
      className={`ml-1 cursor-pointer
                rounded-full 
                bg-caak-${active ? "algalfuel" : "titaniumwhite"}  
                flex items-center 
                justify-${active ? "end" : "start"}`}
    >
      <span
        style={{ width: "18px", height: "18px", marginInline: "2px" }}
        className="bg-white rounded-full"
      />
    </label>
  );
}
