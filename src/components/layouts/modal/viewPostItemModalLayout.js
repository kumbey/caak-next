import useScrollBlock from "../../../hooks/useScrollBlock";
import { useEffect } from "react";

const ViewPostItemModalLayout = ({ children }) => {
  const [blockScroll, allowScroll] = useScrollBlock();
  useEffect(() => {
    blockScroll();
    return () => allowScroll();
  }, [allowScroll, blockScroll]);
  return (
    <div className="popup_modal">
      <div className="popup_modal-viewPost">
        <div className={`h-full bg-black bg-opacity-80`}>{children}</div>
      </div>
    </div>
  );
};

export default ViewPostItemModalLayout;
