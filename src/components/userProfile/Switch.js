export default function Switch({ toggle, active, loading }) {
  return (
    <label
      onClick={() => !loading && toggle((prev) => !prev)}
      style={{ minWidth: "40px", height: "22px" }}
      className={`ml-1 cursor-pointer
                rounded-full 
                bg-caak-${active ? "algalfuel" : "titaniumwhite"}  
                flex items-center 
                justify-${active ? "end" : "start"}`}
    >
      <span
        style={{ width: "18px", height: "18px", marginInline: "2px" }}
        className={`bg-white rounded-full ${
          loading &&
          "border-caak-shit border-t-[2px]  border-r-[2px] animate-spin"
        }`}
      />
    </label>
  );
}
