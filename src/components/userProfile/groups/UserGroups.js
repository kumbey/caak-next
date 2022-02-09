import caakLogo from "../../../../public/assets/images/New-Logo.svg";
import GroupItem from "../../../components/register/groups/groupItem";
import SimpleBar from "simplebar-react";
import Button from "../../button";
import { useEffect, useState } from "react";
import { API } from "aws-amplify";
import { listGroupByCategory } from "../../../graphql-custom/group/queries";
import { getReturnData } from "../../../utility/Util";
import { useRouter } from "next/router";
import { listUserCategoryByUser } from "../../../graphql-custom/category/queries";
import { useUser } from "../../../context/userContext";
import useScrollBlock from "../../../hooks/useScrollBlock";
import Loader from "../../loader";

const UserGroups = ({ setShowGroup, handleToast }) => {
  const [blockScroll, allowScroll] = useScrollBlock();
  const [loading, setLoading] = useState(false);
  const { user } = useUser();
  const [groups, setGroups] = useState({
    items: [],
  });
  const router = useRouter();
  const [followedGroupsCounter, setFollowedGroupsCounter] = useState(0);

  function dynamicSort(property) {
    let sortOrder = 1;
    if (property[0] === "-") {
      sortOrder = -1;
      property = property.substr(1);
    }
    return function (a, b) {
      /* next line works with strings and numbers,
       * and you may want to customize it to your needs
       */
      const result =
        a[property] < b[property] ? -1 : a[property] > b[property] ? 1 : 0;
      return result * sortOrder;
    };
  }

  const fetchUserCategories = async () => {
    let resp = await API.graphql({
      query: listUserCategoryByUser,
      variables: { user_id: user.id },
      authMode: "AMAZON_COGNITO_USER_POOLS",
    });
    resp = getReturnData(resp);
    const tempArr = [];
    const promises = [];
    resp.items.map((item) => {
      const promise = getGroupsByCategory(item.category.id).then((items) => {
        tempArr.push(...items);
        return items;
      });
      promises.push(promise);
    });
    await Promise.all(promises);
    tempArr.sort(dynamicSort("aura"));
    setGroups({ ...groups, items: [...groups.items, ...tempArr.reverse()] });
  };

  const getGroupsByCategory = async (id) => {
    try {
      setLoading(true);
      let resp = await API.graphql({
        query: listGroupByCategory,
        variables: {
          category_id: id,
        },
      });
      resp = getReturnData(resp);

      setLoading(false);
      return resp.items;
    } catch (ex) {
      setLoading(false);
      console.log(ex);
    }
  };

  useEffect(() => {
    blockScroll();
    return () => allowScroll();
  }, [allowScroll, blockScroll]);

  useEffect(() => {
    try {
      setLoading(true);
      fetchUserCategories();
      setLoading(false);
    } catch (ex) {
      setLoading(false);

      console.log(ex);
    }
    //eslint-disable-next-line
  }, []);

  return (
    <div className={"bg-white w-full h-full rounded-[12px]"}>
      <div
        className={
          "flex flex-col items-center justify-center text-center align-center p-[24px] border-b-[1px] border-[#E0E0E1]"
        }
      >
        <img alt={""} className={"w-[42px] h-[42px]"} src={caakLogo.src} />
        <p className={"mt-[20px] font-bold text-[24px] text-caak-generalblack"}>
          Таны сонирхолд нийцсэн группүүд
        </p>
      </div>

      <div className={"flex flex-col pt-[20px]"}>
        {!loading ? (
          <SimpleBar style={{ maxHeight: 456 }}>
            <div className={"groupsSelectContainer px-[40px] pb-[24px]"}>
              {groups.items?.length > 0
                ? groups.items.map((group, index) => {
                    return (
                      <GroupItem
                        followedGroupsCounter={followedGroupsCounter}
                        setFollowedGroupsCounter={setFollowedGroupsCounter}
                        key={index}
                        item={group}
                      />
                    );
                  })
                : null}
            </div>
          </SimpleBar>
        ) : (
          <div className={"w-full flex justify-center items-center"}>
            <Loader className={`bg-caak-primary`} />
          </div>
        )}

        <div className={"h-[104px] border-t-[1px] border-caak-yinbaisilver"}>
          <div className="text-white text-14px flex items-center justify-between pt-[26px]">
            <Button
              disabled={followedGroupsCounter < 1}
              onClick={() => {
                if (followedGroupsCounter !== 0) {
                  setShowGroup(false);
                  handleToast({ param: "changed" });
                }
              }}
              skin={"primary"}
              className={"rounded-md w-full max-w-[420px] mx-auto h-[44px]"}
            >
              <p className={"text-[16px] font-medium"}>Дуусгах</p>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserGroups;
