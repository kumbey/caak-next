import React from "react";
import PendingPostMenu from "./PendingPostMenu";

const GroupInformationDrop = ({
  open,
  onToggle,
  className,
  content,
  shadow,
  onMouseEnter,
}) => {
  return (
    <div
      onClick={onToggle}
      onMouseEnter={onMouseEnter}
      className={`dropdown py-2 ${shadow ? "shadow-dropdown" : ""} ${
        open ? "" : "hidden"
      } ${className ? className : ""}`}
    >
      <div>{content || <PendingPostMenu />}</div>
    </div>
  );
};
export default GroupInformationDrop;
