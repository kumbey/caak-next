const Bank = ({ logo, selected, name, setSelected, index }) => {
  return (
    <div
    onClick={() => setSelected(index)}
      className={
        "last:ml-[13px] first:mr-[13px] cursor-pointer py-[6px] selectBank bg-white flex flex-col justify-center items-center border-[1px] border-caak-titaniumwhite max-w-[172px]p px-[16px] w-full h-[72px] rounded-[8px] bg-white"
      }
    >
      <img
        alt={name}
        className={"w-full h-full max-h-[29px] max-w-[140px] object-contain"}
        src={logo.src}
      />

      <input
        className={"mt-[8px] w-[12px] h-[12px] ring-transparent"}
        checked={selected}
        type={"radio"}
      />
    </div>
  );
};

export default Bank;
