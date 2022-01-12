import Interests from "../../src/components/register/Interests";
import WithInterestComplete from "../../src/middleware/auth/WithInterestComplete";
import useScrollBlock from "../../src/hooks/useScrollBlock";
import {useEffect} from "react";

const Intrst = () => {
  const [blockScroll, allowScroll] = useScrollBlock();

  useEffect(() => {
    blockScroll();
    return () => allowScroll();
  }, [allowScroll, blockScroll]);
  return (
    <div className="popup_modal">
      <div className="popup_modal-interests flex items-center justify-center w-full">
          <Interests />
      </div>
    </div>

  );
};

export default WithInterestComplete(Intrst);
