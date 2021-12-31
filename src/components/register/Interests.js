import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Button from "/src/components/button";
import API from "@aws-amplify/api";
import { graphqlOperation } from "@aws-amplify/api-graphql";
import { listCategorys } from "../../graphql-custom/category/queries";
import { createUserCategory } from "../../graphql-custom/category/mutation";
import { useUser } from "../../context/userContext";
import { getReturnData } from "../../utility/Util";

export default function Interests() {
  const router = useRouter();
  const { cognitoUser, isLoginValid } = useUser();
  const userId = cognitoUser ? cognitoUser.attributes.sub : null;

  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState([]);
  const [categories, setCategories] = useState([]);

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
      for (var i = 0; i < selected.length; i++) {
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
      if (router.query.isModal) {
        router.replace(
          {
            pathname: router.pathname,
            query: {
              ...router.query,
              signInUp: "complete",
            },
          },
          `/signInUp/complete`,
          { shallow: true, scroll: false }
        );
      } else {
        router.replace("/signInUp/complete", undefined, {
          shallow: true,
          scroll: false,
        });
      }

      setLoading(false);
    } catch (ex) {
      setLoading(false);
      console.log(ex);
    }
  };

  const fetchCat = async () => {
    const resp = await API.graphql(graphqlOperation(listCategorys));
    setCategories(getReturnData(resp).items);
  };

  useEffect(() => {
    fetchCat();
  }, []);

  return router.query.isModal ? (
    <div className="px-2 sm:px-10 pb-c1">
      <div
        className={
          "flex text-caak-generalblack justify-center text-center align-center  pb-c2 mt-9 font-bold text-24px"
        }
      >
        Таны сонирхол
      </div>
      <div
        style={{ maxWidth: "360px" }}
        className={"flex text-caak-darkBlue mb-c2 text-15px text-center"}
      >
        Та өөрийн дуртай сонирхлуудыг сонгосноор өөрийн хүрээллийг хурдан олох
        боломжтой.
      </div>
      <div className="flex flex-row flex-wrap items-center justify-center gap-3">
        {categories.map((data, index) => {
          return (
            <div
              key={index}
              onClick={(e) => selectHandler(data.id)}
              className={`flex items-center border py-px-6 rounded-full justify-center cursor-pointer px-c6 
                          ${
                            selected.find((item) => item === data.id)
                              ? "bg-caak-primary text-white"
                              : ""
                          }
                                        `}
            >
              {selected.find((item) => item === data.id) ? (
                <span className="icon-fi-rs-check text-12px mr-1.5" />
              ) : (
                <span className={`mr-1.5 text-18px`}>{data.icon}</span>
              )}
              <p className="text-15px font-medium">{data.name}</p>
            </div>
          );
        })}
      </div>

      <p
        className={`${
          selected.length < 3 ? "opacity-100" : "opacity-0"
        } text-center mt-5 text-caak-primary text-15px`}
      >
        Хамгийн багадаа 3-ыг сонгоно уу!
      </p>
      <div className=" px-c8 ph:px-c2 text-white text-14px flex items-center justify-between mt-5">
        <Button
          loading={loading}
          onClick={() => submitHandler()}
          className={
            "rounded-md w-full h-c9 text-17px font-bold bg-caak-primary"
          }
        >
          Дуусгах
        </Button>
      </div>
    </div>
  ) : null;
}
