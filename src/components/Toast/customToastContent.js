<div className="toastOptions flex items-center justify-between">
  <div className="flex items-center">
    <div className=" w-[28px] h-[28px] flex items-center justify-center rounded-full bg-[#ffcc00] mr-3">
      <span className="icon-fi-rs-warning-1 text-white" />
    </div>
    <p className="mr-[10px] text-15px font-inter font-normal text-caak-generalblack tracking-[0.23px] leading-[18px]">
      Бид таны репортыг хүлээн авлаа.
    </p>
    <button
      className="text-caak-retroblue text-15px"
      onClick={() => toast.dismiss(t.id)}
    >
      Үзэх
    </button>
  </div>
  <button onClick={() => toast.dismiss(t.id)}>
    <span className="icon-fi-rs-close text-caak-aleutian" />
  </button>
</div>;
