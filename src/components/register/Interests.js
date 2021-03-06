import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Button from "/src/components/button";
import API from "@aws-amplify/api";
import { graphqlOperation } from "@aws-amplify/api-graphql";
import { listCategorys } from "../../graphql-custom/category/queries";
import { createUserCategory } from "../../graphql-custom/category/mutation";
import { useUser } from "../../context/userContext";
import { getFileUrl, getGenderImage, getReturnData } from "../../utility/Util";
import caakLogo from "/public/assets/images/New-Logo.svg";
import SimpleBar from "simplebar-react";
export default function Interests() {
  const router = useRouter();
  const { cognitoUser, isLoginValid } = useUser();
  const userId = cognitoUser ? cognitoUser?.attributes?.sub : null;
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState([]);
  const [categories, setCategories] = useState([]);
  const minCategories = 3;
  const selectHandler = (id) => {
    if (selected.length === 0) setSelected([...selected, id]);

    if (selected.includes(id)) {
      setSelected(selected.filter((item) => item !== id));
    } else {
      setSelected([...selected, id]);
    }
  };

  const submitHandler = async () => {
    try {
      setLoading(true);
      isLoginValid();
      for (let i = 0; i < selected.length; i++) {
        await API.graphql(
          graphqlOperation(createUserCategory, {
            input: {
              id: `${selected[i]}#${userId}`,
              category_id: selected[i],
              user_id: userId,
            },
          })
        );
      }
      router.replace(
        {
          pathname: router.pathname,
          query: {
            ...router.query,
            signInUp: "groups",
          },
        },
        "/signInUp/groups",
        { shallow: true, scroll: false }
      );
      // router.replace("/");

      setLoading(false);
    } catch (ex) {
      setLoading(false);
      console.log(ex);
    }
  };

  const fetchCat = async () => {
    const resp = await API.graphql(graphqlOperation(listCategorys));
    // const resp = await API.graphql({
    //   query: listCategorys,
    //   authMode: "AWS_IAM",
    // });
    setCategories(getReturnData(resp).items);
  };

  useEffect(() => {
    fetchCat();
  }, []);

  return router.query.isModal ? (
    <div className="rounded-[12px] bg-white pb-[34px] w-full">
      <div
        className={
          "flex flex-col items-center justify-center text-center align-center p-[24px] border-b-[1px] border-[#E0E0E1]"
        }
      >
        <img alt={""} className={"w-[42px] h-[42px]"} src={caakLogo.src} />
        <p className={"mt-[20px] font-bold text-[24px] text-caak-generalblack"}>
          ???????? ???????????? ?????????????????????
        </p>
      </div>

      <SimpleBar style={{ maxHeight: "50vh" }}>
        <div className="px-[16px] md:px-[36px] py-[28px] interestsContainer justify-center items-center">
          {categories.map((data, index) => {
            return (
              <div
                key={index}
                onClick={() => selectHandler(data.id)}
                className={`relative flex items-center justify-center h-full max-h-[170px] min-h-[108px] rounded-[8px] cursor-pointer`}
              >
                <div
                  className={`flex items-center rounded-[8px] w-full h-full justify-center group `}
                >
                  <img
                    className={`${
                      selected.find((item) => item === data.id)
                        ? "border-[3px] border-caak-primary h-[calc(100%-6px)] w-[calc(100%-6px)]"
                        : ""
                    } group-hover:w-[calc(100%-6px)] group-hover:h-[calc(100%-6px)] border-outer group-hover:brightness-75 transition-all duration-100 rounded-[6px] object-cover w-full h-full`}
                    alt={""}
                    src={
                      data?.picture
                        ? getFileUrl(data?.picture)
                        : getGenderImage("default").src
                    }
                  />
                  {selected.find((item) => item === data.id) && (
                    <div
                      className={
                        "w-[24px] h-[24px] flex items-center justify-center rounded-full bg-caak-primary absolute right-[10px] top-[10px]"
                      }
                    >
                      <span
                        className={
                          "icon-fi-rs-thick-check text-[13px] w-[13px] h-[12px] text-white"
                        }
                      />
                    </div>
                  )}
                  <div
                    className={"absolute bottom-[10px] left-[14px] pr-[14px]"}
                  >
                    <p
                      style={{
                        textShadow: "0px 3px 4px #0000004D",
                      }}
                      className="text-white text-[16px] font-semibold tracking-[0.24px] leading-[19px] break-all"
                    >
                      {data.name}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </SimpleBar>

      <div className="text-white text-14px flex items-center justify-between pt-[26px]">
        <Button
          disabled={minCategories - selected.length > 0}
          skin={"primary"}
          loading={loading}
          onClick={() => submitHandler()}
          className={"rounded-md w-full max-w-[420px] mx-auto h-[44px]"}
        >
          <p className={"text-[16px] font-medium"}>
            ????????????????????????
            {minCategories - selected.length > 0 &&
              ` (${minCategories - selected.length})`}
          </p>
        </Button>
      </div>
    </div>
  ) : null;
}
