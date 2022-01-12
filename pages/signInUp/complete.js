import Completed from "../../src/components/register/completed";
import useScrollBlock from "../../src/hooks/useScrollBlock";
import { useEffect } from "react";

const Complete = () => {
  const [blockScroll, allowScroll] = useScrollBlock();

  useEffect(() => {
    blockScroll();
    return () => allowScroll();
  }, [allowScroll, blockScroll]);
  return (
    <div className="popup_modal">
      <div className="popup_modal-content rounded-xl">
            <Completed />
      </div>
    </div>
  );
};

export default Complete;
