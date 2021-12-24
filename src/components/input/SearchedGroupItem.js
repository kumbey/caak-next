import Image from "next/image";
import {
  generateFileUrl,
  getGenderImage,
  getReturnData,
} from "../../utility/Util";
import Link from "next/link";
import { useEffect, useState } from "react";
import { API } from "aws-amplify";
import { getPostSearchItem } from "../../graphql-custom/post/queries";
import { useUser } from "../../context/userContext";
import { getGroupSearchView } from "../../graphql-custom/group/queries";
import { getUserSearchView } from "../../graphql-custom/user/queries";

const SearchedGroupItem = ({ setIsSearchBarOpen, clear, type, id }) => {
  const [userData, setUserData] = useState();
  const [postData, setPostData] = useState();
  const [groupData, setGroupData] = useState();

  const { isLogged } = useUser();
  const getPostSearchInfo = async () => {
    try {
      let resp = await API.graphql({
        query: getPostSearchItem,
        variables: { id: id },
        authMode: isLogged ? "AMAZON_COGNITO_USER_POOLS" : "AWS_IAM",
      });
      resp = getReturnData(resp);
      setPostData(resp);
    } catch (ex) {
      console.log(ex);
    }
  };

  const getGroupSearchInfo = async () => {
    try {
      let resp = await API.graphql({
        query: getGroupSearchView,
        variables: { id: id },
        authMode: isLogged ? "AMAZON_COGNITO_USER_POOLS" : "AWS_IAM",
      });
      resp = getReturnData(resp);
      setGroupData(resp);
    } catch (ex) {
      console.log(ex);
    }
  };

  const getUserSearchInfo = async () => {
    try {
      let resp = await API.graphql({
        query: getUserSearchView,
        variables: { id: id },
        authMode: isLogged ? "AMAZON_COGNITO_USER_POOLS" : "AWS_IAM",
      });
      resp = getReturnData(resp);
      setUserData(resp);
    } catch (ex) {
      console.log(ex);
    }
  };

  useEffect(() => {
    if (type === "POST") {
      getPostSearchInfo();
    } else if (type === "GROUP") {
      getGroupSearchInfo();
    } else {
      getUserSearchInfo();
    }
    // eslint-disable-next-line
  }, []);

  const linkHandler = () => {
    if (type === "POST") {
      return `/post/view/${postData.id}`;
    } else if (type === "GROUP") {
      return `/group/${groupData.id}`;
    } else {
      return `/user/${userData.id}/profile`;
    }
  };
  const postImageHandler = () => {
    if (type === "POST") {
      if (postData) {
        return generateFileUrl(postData.items.items[0].file);
      }
    } else if (type === "GROUP") {
      if (groupData) {
        if (groupData.profile) {
          return generateFileUrl(groupData.profile);
        } else {
          return getGenderImage("default").src;
        }
      }
    } else {
      if (userData) {
        if (userData.pic) {
          return generateFileUrl(userData.pic);
        } else {
          return getGenderImage("default").src;
        }
      }
    }
  };

  return userData || postData || groupData ? (
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
              src={postImageHandler()}
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
            {type === "POST" && postData.title}
            {type === "GROUP" && groupData.name}
            {type === "USER" && userData.nickname}
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
  ) : null;
};

export default SearchedGroupItem;
