import Input from "./index";
import { useEffect, useState } from "react";
import SearchedGroupItem from "./SearchedGroupItem";
import Link from "next/link";
import {
  generateFileUrl,
  sortSearchResultByKeyword,
  useClickOutSide,
  useDebounce,
} from "../../utility/Util";
import { API } from "aws-amplify";
import Loader from "../loader";
import { useRouter } from "next/router";
import { searchApi } from "../../apis/search";
import { useWrapper } from "../../context/wrapperContext";

const SearchInput = ({ label, containerStyle, className, ...props }) => {
  const [isSearchBarOpen, setIsSearchBarOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [groups, setGroups] = useState([]);
  const [users, setUsers] = useState([]);
  const [posts, setPosts] = useState({});
  const router = useRouter();
  const searchInputRef = useClickOutSide(() => setIsSearchBarOpen(false));
  const debouncedSearchResult = useDebounce(inputValue, 300);
  const { navBarTransparent } = useWrapper();
  const searchQuery = async () => {
    const resp = await searchApi({
      API,
      searchQuery: inputValue,
      postLimit: 10,
    });
    setGroups(resp.groups);
    setUsers(resp.users);
    setPosts(resp.posts);
  };

  useEffect(() => {
    if (debouncedSearchResult) {
      if (!inputValue.startsWith(" ")) {
        setIsSearching(true);
        searchQuery().then(() => {
          setIsSearching(false);
        });
      }
    } else {
      setIsSearching(false);
    }
    // eslint-disable-next-line
  }, [debouncedSearchResult]);
  const handler = (e) => {
    if (e.keyCode === 13) {
      setIsSearchBarOpen(false);
      e.preventDefault();
      router.push(`/search?q=${e.target.value}`, undefined);
    }
  };

  return (
    <div
      ref={searchInputRef}
      className="relative bg-transparent flex justify-center items-center"
    >
      <div
        className={`${
          !isSearchBarOpen ? "hidden" : null
        } w-full bg-white overflow-y-auto max-h-[400px] pt-[60px] absolute top-0 rounded-square shadow-searchInput p-[14px] min-h-[100px]`}
      >
        {/*{!inputValue && (*/}
        {/*  <div>*/}
        {/*    <div className={`text-15px text-caak-darkBlue pl-[6px]`}>*/}
        {/*      Сүүлд хийгдсэн хайлтууд*/}
        {/*    </div>*/}
        {/*    <div className={"pb-[12px]"}>*/}
        {/*      <SearchedGroupItem*/}
        {/*        setIsSearchBarOpen={setIsSearchBarOpen}*/}
        {/*        name={"Кино сонирхогчид"}*/}
        {/*        clear*/}
        {/*      />*/}
        {/*      <SearchedGroupItem*/}
        {/*        setIsSearchBarOpen={setIsSearchBarOpen}*/}
        {/*        name={"UX/UI сонирхогчид"}*/}
        {/*        clear*/}
        {/*      />*/}
        {/*    </div>*/}
        {/*  </div>*/}
        {/*)}*/}

        {!isSearching ? (
          <div>
            {groups?.map((item, index) => {
              if (index < 10)
                return (
                  <SearchedGroupItem
                    type={"GROUP"}
                    id={item.id}
                    key={index}
                    setIsSearchBarOpen={setIsSearchBarOpen}
                  />
                );
            })}
            {users?.map((item, index) => {
              if (index < 10)
                return (
                  <SearchedGroupItem
                    type={"USER"}
                    id={item.id}
                    key={index}
                    setIsSearchBarOpen={setIsSearchBarOpen}
                  />
                );
            })}
            {posts.items?.map((item, index) => {
              return (
                <SearchedGroupItem
                  type={"POST"}
                  id={item.id}
                  key={index}
                  setIsSearchBarOpen={setIsSearchBarOpen}
                />
              );
            })}
            <div
              className={
                "flex flex-row items-center px-[6px] pt-[14px] border-t border-caak-liquidnitrogen"
              }
            >
              <div
                className={
                  "flex justify-center items-center cursor-pointer w-[34px] h-[34px] bg-caak-primary rounded-square"
                }
              >
                <span className={"icon-fi-rs-search text-white"} />
              </div>
              <Link
                href={{
                  pathname: "/search",
                  query: { q: `${inputValue}` },
                }}
              >
                <a>
                  <div
                    className={
                      "text-15px cursor-pointer text-caak-primary ml-[10px]"
                    }
                  >
                    Илүү ихийг харах
                  </div>
                </a>
              </Link>
            </div>
          </div>
        ) : (
          <div className={"w-full flex justify-center items-center"}>
            <Loader className={`bg-caak-primary`} />
          </div>
        )}
      </div>
      <div className={"w-full bg-transparent"}>
        <Input
          hideError
          {...props}
          onKeyDown={handler}
          // onBlur={() => setIsSearchBarOpen(false)}
          onFocus={() => setIsSearchBarOpen(true)}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          label={label}
          className={`pl-c27 h-[36px] pl-[42px] ${className ? className : ""} ${
             isSearchBarOpen
              ? "border border-caak-primary ring-2 ring-caak-primary ring-opacity-40 text-caak-generalblack"
              : navBarTransparent ? "text-white placeholder-white" : "text-caak-generalblack"
          }`}
        >
          <div
            className={
              "flex justify-center items-center absolute w-[20px] h-[20px] left-[18px] mr-px-7 top-1/2 transform -translate-y-1/2 z-2"
            }
          >
            <span
              className={`${
                navBarTransparent && !isSearchBarOpen
                  ? "text-white"
                  : "text-caak-darkblue"
              } icon-fi-rs-search text-16px`}
            />
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
