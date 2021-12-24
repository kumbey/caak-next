import { useEffect } from "react";
import { useRouter } from "next/router";

const ViewPostItemModalLayout = ({ children }) => {
  const router = useRouter();

  useEffect(() => {
    const handler = (e) => {
      if (e.keyCode === 27) {
        router.back();
      }
    };
    document.addEventListener("keydown", handler);
    return () => {
      document.removeEventListener("keydown", handler);
    };
    // eslint-disable-next-line
  }, []);

  return (
    <div className="popup_modal">
      <div className="popup_modal-viewPost">
        <div className={`h-full bg-black bg-opacity-80`}>
          {children}
        </div>
      </div>
    </div>
  );
};

export default ViewPostItemModalLayout;
