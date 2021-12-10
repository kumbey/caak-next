export default function Switch({ toggle, active }) {
  return (
    <label
      onClick={() => toggle((prev) => !prev)}
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
