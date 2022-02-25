import { useEffect, useRef, useState } from "react";
import GroupInfoCard from "../../card/GroupInfoCard";
import GroupTrendPostsCard from "../../card/GroupTrendPostsCard";
import useScrollBlock from "../../../hooks/useScrollBlock";
import ModalBanner from "../../modalBanner";
import Banner from "../../banner";
import {useRouter} from "next/router";

const ViewPostModalLayout = ({
  children,
  containerClassname,
  post,
  jumpToComment,
  commentRef,
}) => {
  const [bannerOpen, setBannerOpen] = useState(false);
  const [blockScroll, allowScroll] = useScrollBlock();
  const [isScrollButtonVisible, setIsScrollButtonVisible] = useState(false);
  const modalRef = useRef(null);
  const viewPostRef = useRef();
  const router  = useRouter()

  const onClickScrollTop = () => {
    if (modalRef.current) {
      modalRef.current.scrollTo({
        behavior: "smooth",
        top: 0,
      });
    }
  };
  const back = () => {
    if (router.query && router.query.prevPath) {
      router.replace(router.query.prevPath, undefined, { shallow: true });
    } else {
      router.replace(`/`);
    }
  };
  useEffect(() => {
    if (modalRef.current) {
      const modalRefCurrent = modalRef.current;
      const listener = () => {
        const scrolled = modalRef.current.scrollTop;
        if (scrolled > 54) {
          setIsScrollButtonVisible(true);
        } else {
          setIsScrollButtonVisible(false);
        }
      };
      modalRefCurrent.addEventListener("scroll", listener);
      return () => {
        modalRefCurrent.removeEventListener("scroll", listener);
      };
    }
  });

  useEffect(() => {
    if (jumpToComment) {
      if (commentRef) {
        const timer = setTimeout(() => {
          commentRef.current.scrollIntoView({ behavior: "smooth" });
        }, 1000);
        return () => clearTimeout(timer);
      }
    }
    //eslint-disable-next-line
  }, [jumpToComment]);

  useEffect(() => {
    blockScroll();
    return () => allowScroll();
  }, [allowScroll, blockScroll]);

  useEffect(() => {
    setTimeout(() => {
      setBannerOpen(true);
    }, 2500);
  }, []);

  return (
    <div ref={modalRef} className="popup_modal">
      <div className="popup_modal-viewPost">
        <div onClick={()=> back()} className={`h-full bg-black bg-opacity-80`}>
          <div
            onClick={(e)=> {e.stopPropagation()}}
            className={`rounded-lg relative ${
              containerClassname ? containerClassname : ""
            }`}
          >
            <div
              className={
                "viewPostLayoutContainer relative items-center lg:items-start md:px-[20px] lg:px-0"
              }
            >
              <div ref={viewPostRef} className={"viewPostItem"}>
                {children}
              </div>
              <div
                className={
                  "viewPostRightSideBar h-full flex items-center ml-0 md:ml-[20px] flex-col-reverse md:flex-col"
                }
              >
                {isScrollButtonVisible && (
                  <div
                    onClick={() => onClickScrollTop()}
                      className={`shadow-dropdown flex items-center fixed bottom-[20px] cursor-pointer rounded-[100px] h-[40px] z-[4] bg-white py-[12px] px-[20px]`}
                  >
                    <div className={"w-[20px] h-[20px] -rotate-90"}>
                      <span
                        className={"icon-fi-rs-next-b text-black text-[20px]"}
                      />
                    </div>
                    <p className={"ml-[9px] text-[14px] font-medium tracking-[0.21px] leading-[17px]"}>
                      Дээш буцах
                    </p>
                  </div>
                )}
                <div className={"flex flex-col w-full"}>
                  <GroupInfoCard
                    containerClassname={"mb-[16px]"}
                    groupId={post.group_id}
                  />
                  <GroupTrendPostsCard
                    onClickItem={onClickScrollTop}
                    maxItems={5}
                    groupId={post.group_id}
                  />
                </div>
                <Banner location={"post"} />
              </div>
            </div>
          </div>
          <ModalBanner setBannerOpen={setBannerOpen} bannerOpen={bannerOpen} />
        </div>
      </div>
    </div>
  );
};

export default ViewPostModalLayout;
