import Image from "next/image";
import { getFileUrl, getGenderImage, getReturnData } from "../../utility/Util";
import Link from "next/link";
import { useEffect, useState } from "react";
import { API } from "aws-amplify";
import { getPostSearchItem } from "../../graphql-custom/post/queries";
import { useUser } from "../../context/userContext";
import { getGroupSearchView } from "../../graphql-custom/group/queries";
import { getUserSearchView } from "../../graphql-custom/user/queries";

const SearchedGroupItem = ({
  image,
  name,
  setIsSearchBarOpen,
  clear,
  item,
  type,
  id,
}) => {
  const [userData, setUserData] = useState({});
  const [postData, setPostData] = useState({});
  const [groupData, setGroupData] = useState({});

  const { isLogged } = useUser();
  const getPostSearchInfo = async () => {
    let resp = await API.graphql({
      query: getPostSearchItem,
      variables: { id: id },
      authMode: isLogged ? "AMAZON_COGNITO_USER_POOLS" : "AWS_IAM",
    });
    resp = getReturnData(resp);
    setPostData(resp);
  };

  const getGroupSearchInfo = async () => {
    let resp = await API.graphql({
      query: getGroupSearchView,
      variables: { id: id },
      authMode: isLogged ? "AMAZON_COGNITO_USER_POOLS" : "AWS_IAM",
    });
    resp = getReturnData(resp);
    setGroupData(resp);
  };

  const getUserSearchInfo = async () => {
    let resp = await API.graphql({
      query: getUserSearchView,
      variables: { id: id },
      authMode: isLogged ? "AMAZON_COGNITO_USER_POOLS" : "AWS_IAM",
    });
    resp = getReturnData(resp);
    setUserData(resp);
  };

  useEffect(() => {
    if (type === "POST") {
      getPostSearchInfo();
    } else if (type === "GROUP") {
      getGroupSearchInfo();
    } else {
      getUserSearchInfo();
    }
  }, [id]);

  const linkHandler = () => {
    if (item.type === "POST") {
      return `/post/view/${item.id}`;
    } else if (item.type === "GROUP") {
      return `/group/${item.id}`;
    } else {
      return `/user/${item.id}/profile`;
    }
  };
  const postImageHandler = () => {
    if (item) {
      if (item.type === "POST") {
        return getFileUrl(item.items.items[0].file);
      } else if (item.type === "GROUP") {
        if (item.profile) {
          return getFileUrl(item.profile.file);
        } else {
          return getGenderImage("default").src;
        }
      } else {
        if (item.pic) {
          return getFileUrl(item.pic.file);
        } else {
          return getGenderImage("default").src;
        }
      }
    } else {
      return getGenderImage("default").src;
    }
  };

  return (
    <Link href={linkHandler()}>
      <a>
        <div
          onClick={() => setIsSearchBarOpen(false)}
          className={
            "cursor-pointer flex flex-row flex-grow items-center relative p-[6px] hover:bg-caak-liquidnitrogen rounded-[10px]"
          }
        >
          <div
            className={
              "flex flex-shrink-0 items-center justify-center w-[34px] h-[34px] rounded-square"
            }
          >
            <Image
              className={"rounded-square object-cover"}
              src={`${image ? image : postImageHandler()}`}
              alt=""
              width={34}
              height={34}
            />
          </div>
          <div
            className={
              "whitespace-nowrap overflow-hidden overflow-ellipsis text-15px font-medium text-caak-generalblack ml-[10px]"
            }
          >
            {name}
          </div>
          {clear && (
            <div
              onClick={(e) => e.stopPropagation()}
              className={
                "flex items-center justify-center cursor-pointer rounded-full p-1.5  hover:bg-gray-200 absolute right-[16px] top-1/2 transform -translate-y-1/2"
              }
            >
              <span
                className={"icon-fi-rs-close text-caak-blue w-[16px] h-[16px]"}
              />
            </div>
          )}
        </div>
      </a>
    </Link>
  );
};

export default SearchedGroupItem;
