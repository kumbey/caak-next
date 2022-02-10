import { useState, useEffect } from "react";
import Button from "/src/components/button";
import API from "@aws-amplify/api";
import { graphqlOperation } from "@aws-amplify/api-graphql";
import { listCategorys } from "../../graphql-custom/category/queries";
import {
  createUserCategory,
  deleteUserCategory,
} from "../../graphql-custom/category/mutation";
import { useUser } from "../../context/userContext";
import { getFileUrl, getGenderImage, getReturnData } from "../../utility/Util";
import caakLogo from "/public/assets/images/New-Logo.svg";
import SimpleBar from "simplebar-react";

export default function UserInterests({
  setShowInterest,
  selectedCats,
  setShowGroup,
}) {
  const { cognitoUser, isLoginValid } = useUser();
  const userId = cognitoUser ? cognitoUser?.attributes?.sub : null;
  const [loading, setLoading] = useState(false);

  const [selected, setSelected] = useState(selectedCats || []);
  const [categories, setCategories] = useState([]);
  const [addCat, setAddCat] = useState([]);
  const [delCat, setDelCat] = useState([]);
  const minCategories = 3;

  const selectHandler = (id) => {
    if (selected.length === 0) setSelected([...selected, id]);

    if (selected.includes(id)) {
      setSelected(selected.filter((item) => item !== id));
    } else {
      setSelected([...selected, id]);
    }

    if (selectedCats.includes(id)) {
      if (delCat.includes(id)) {
        setDelCat(delCat.filter((item) => item !== id));
      } else {
        setDelCat([...delCat, id]);
      }
    } else {
      if (addCat.includes(id)) {
        setAddCat(addCat.filter((item) => item !== id));
      } else {
        setAddCat([...addCat, id]);
      }
    }
  };

  const submitHandler = async () => {
    try {
      setLoading(true);
      isLoginValid();

      if (addCat.length > 0) {
        for (let i = 0; i < addCat.length; i++) {
          await API.graphql(
            graphqlOperation(createUserCategory, {
              input: {
                id: `${addCat[i]}#${userId}`,
                category_id: addCat[i],
                user_id: userId,
              },
            })
          );
        }
      }
      if (delCat.length > 0) {
        for (let i = 0; i < delCat.length; i++) {
          await API.graphql(
            graphqlOperation(deleteUserCategory, {
              input: {
                id: `${delCat[i]}#${userId}`,
              },
            })
          );
        }
      }
      setShowInterest(false);
      setShowGroup(true);
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

  return (
    <div className="popup_modal">
      <div className="popup_modal-interests flex items-center justify-center w-full">
        <div className="rounded-[12px] bg-white pb-[34px] w-full">
          <div
            className={
              "flex  relative flex-col items-center justify-center text-center align-center p-[24px] border-b-[1px] border-[#E0E0E1]"
            }
          >
            <img alt={""} className={"w-[42px] h-[42px]"} src={caakLogo.src} />
            <p
              className={
                "mt-[20px] font-bold text-[24px] text-caak-generalblack"
              }
            >
              Таны дуртай сонирхлууд?
            </p>
            <div
              className="absolute right-6 top-6"
              onClick={() => setShowInterest(false)}
            >
              <span className="icon-fi-rs-close  text-caak-generalblack text-14px bg-caak-titaniumwhite w-c3 h-c3 flex items-center justify-center rounded-full cursor-pointer" />
            </div>
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
                        className={
                          "absolute bottom-[10px] left-[14px] pr-[14px]"
                        }
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
                Үргэлжлүүлэх
                {minCategories - selected.length > 0 &&
                  ` (${minCategories - selected.length})`}
              </p>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
