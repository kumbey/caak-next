import Input from "./index";
import { useEffect, useState } from "react";
import SearchedGroupItem from "./SearchedGroupItem";
import {
  generateFileUrl,
  getReturnData,
  useClickOutSide,
  useDebounce,
} from "../../utility/Util";
import { API } from "aws-amplify";
import { listGroupsForAddPost } from "../../graphql-custom/group/queries";
import Loader from "../loader";
import { getPostByStatus } from "../../graphql-custom/post/queries";

const SearchInput = ({ label, containerStyle, className, ...props }) => {
  const [isSearchBarOpen, setIsSearchBarOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  const searchInputRef = useClickOutSide(() => setIsSearchBarOpen(false));
  const debouncedSearchResult = useDebounce(inputValue, 300);

  const getGroups = async () => {
    const resp = await API.graphql({
      query: listGroupsForAddPost,
      authMode: "AWS_IAM",
      variables: { limit: 4, filter: { name: { contains: inputValue } } },
    });
    return getReturnData(resp).items;
  };

  const getPosts = async () => {
    const resp = await API.graphql({
      query: getPostByStatus,
      authMode: "AWS_IAM",
      sortDirection: "DESC",
      variables: {
        status: "CONFIRMED",
        filter: { title: { contains: inputValue } },
      },
    });
    return getReturnData(resp).items;
  };

  const searchQuery = async () => {
    const queriedGroups = await getGroups();
    const queriedPosts = await getPosts();
    setSearchResult([...queriedGroups.concat(queriedPosts)]);
  };

  useEffect(() => {
    if (debouncedSearchResult) {
      setIsSearching(true);
      searchQuery().then(() => {
        setIsSearching(false);
      });
    } else {
      setSearchResult([]);
      setIsSearching(false);
    }
  }, [debouncedSearchResult]);

  return (
    <div
      ref={searchInputRef}
      className="relative p-[8px] flex justify-center items-center"
    >
      <div
        className={`${
          !isSearchBarOpen ? "hidden" : null
        } w-full bg-white pt-[60px] absolute top-0 rounded-square shadow-searchInput p-[14px] min-h-[100px]`}
      >
        {!inputValue && (
          <div>
            <div className={`text-15px text-caak-darkBlue pl-[6px]`}>
              Сүүлд хийгдсэн хайлтууд
            </div>
            <div className={"pb-[12px]"}>
              <SearchedGroupItem
                setIsSearchBarOpen={setIsSearchBarOpen}
                name={"Кино сонирхогчид"}
                clear
              />
              <SearchedGroupItem
                setIsSearchBarOpen={setIsSearchBarOpen}
                name={"UX/UI сонирхогчид"}
                clear
              />
            </div>

            <div
              className={
                "flex flex-row items-center p-[6px] pt-[14px] border-t border-caak-liquidnitrogen"
              }
            >
              <div
                className={
                  "flex justify-center items-center cursor-pointer w-[34px] h-[34px] bg-caak-primary rounded-square"
                }
              >
                <span className={"icon-fi-rs-search text-white"} />
              </div>
              <div
                className={
                  "text-15px cursor-pointer text-caak-primary ml-[10px]"
                }
              >
                Илүү ихийг харах
              </div>
            </div>
          </div>
        )}

        {!isSearching ? (
          <div>
            {searchResult?.map((item, index) => {
              return (
                <SearchedGroupItem
                  key={index}
                  setIsSearchBarOpen={setIsSearchBarOpen}
                  name={item.name ? item.name : item.title}
                  image={generateFileUrl(item.profile)}
                />
              );
            })}
          </div>
        ) : (
          <div className={"w-full flex justify-center items-center"}>
            <Loader className={`bg-caak-primary`} />
          </div>
        )}
      </div>
      <div className={"w-full"}>
        <Input
          hideError
          {...props}
          // onBlur={() => setIsSearchBarOpen(false)}
          onFocus={() => setIsSearchBarOpen(true)}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          label={label}
          className={`pl-c27 h-[36px] pl-[42px] bg-gray-100 ${
            className ? className : ""
          } ${
            isSearchBarOpen
              ? "border border-caak-primary ring-2 ring-caak-primary ring-opacity-40"
              : ""
          }`}
        >
          <div
            className={
              "flex justify-center items-center absolute w-[20px] h-[20px] left-[18px] mr-px-7 top-1/2 transform -translate-y-1/2 z-2"
            }
          >
            <span className={"icon-fi-rs-search text-16px text-darkblue "} />
          </div>

          <div
            onClick={() => setInputValue("")}
            className={`${
              !isSearchBarOpen ? "hidden" : null
            } flex justify-center items-center text-center absolute w-[20px] h-[20px] cursor-pointer bg-caak-primary rounded-full right-[12px] top-1/2 transform -translate-y-1/2 z-2`}
          >
            <span className={"icon-fi-rs-close text-[10px] text-white "} />
          </div>
        </Input>
      </div>
    </div>
  );
};

export default SearchInput;
