import Input from "./index";
import { useEffect, useState } from "react";
import SearchedGroupItem from "./SearchedGroupItem";
import Link from "next/link";
import {
  generateFileUrl,
  getReturnData,
  sortSearchResultByKeyword,
  useClickOutSide,
  useDebounce,
} from "../../utility/Util";
import { API } from "aws-amplify";
import Loader from "../loader";
import { useRouter } from "next/router";
import {searchApi} from "../../apis/search";

const SearchInput = ({ label, containerStyle, className, ...props }) => {
  const [isSearchBarOpen, setIsSearchBarOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const router = useRouter();
  const searchInputRef = useClickOutSide(() => setIsSearchBarOpen(false));
  const debouncedSearchResult = useDebounce(inputValue, 300);

  const searchQuery = async () => {
    const resp = await searchApi({ API, searchQuery: inputValue, limit: 2 });
    setSearchResult(resp)
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
      className="relative p-[8px] flex justify-center items-center"
    >
      <div
        className={`${
          !isSearchBarOpen ? "hidden" : null
        } w-full bg-white overflow-y-auto max-h-[400px] pt-[60px] absolute top-0 rounded-square shadow-searchInput p-[14px] min-h-[100px]`}
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
          </div>
        )}

        {!isSearching ? (
          <div>
            {sortSearchResultByKeyword(searchResult, inputValue)?.map((item, index) => {
              if (item.nickname) {
                return (
                  <SearchedGroupItem
                    key={index}
                    setIsSearchBarOpen={setIsSearchBarOpen}
                    name={item.nickname}
                    image={generateFileUrl(item.pic)}
                  />
                );
              } else {
                return (
                  <SearchedGroupItem
                    key={index}
                    setIsSearchBarOpen={setIsSearchBarOpen}
                    name={item.name ? item.name : item.title}
                    image={generateFileUrl(item.profile)}
                  />
                );
              }
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
      <div className={"w-full"}>
        <Input
          hideError
          {...props}
          onKeyDown={handler}
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
