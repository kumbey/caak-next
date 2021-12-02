import { useRef, useState } from "react";

export const Accordion = ({
  title,
  content,
  titleClassname,
  contentClassname,
}) => {
  const [active, setActive] = useState(false);
  const [height, setHeight] = useState("0px");
  // const [rotate, setRotate] = useState("transform duration-700 ease");

  const contentSpace = useRef(null);

  function toggleAccordion() {
    setActive(active === false);
    setHeight(active ? "0px" : `${contentSpace.current.scrollHeight}px`);
  }

  return (
    <div className="flex flex-col flex-1">
      <button
        className="box-border appearance-none cursor-pointer focus:outline-none flex items-center justify-between text-left"
        onClick={toggleAccordion}
      >
        <p className={`${titleClassname ? titleClassname : ""}`}>{title}</p>
        <div className={"w-[14px] h-[14px] flex justify-center items-center"}>
          <span
            className={`icon-fi-rs-next text-[12px] ${
              active
                ? "transform duration-300 ease rotate-[270deg]"
                : "transform duration-300 ease rotate-90"
            } inline-block`}
          />
        </div>
      </button>
      <div
        ref={contentSpace}
        style={{ maxHeight: `${height}` }}
        className="overflow-auto overflow-y-hidden transition-max-height duration-300 ease-in-out"
      >
        <div className={`${contentClassname ? contentClassname : ""}`}>
          {content}
        </div>
      </div>
    </div>
  );
};
