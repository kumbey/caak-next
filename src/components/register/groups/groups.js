import caakLogo from "../../../../public/assets/images/New-Logo.svg";
import GroupItem from "./groupItem";
import SimpleBar from "simplebar-react";
import Button from "../../button";
import { useEffect, useState } from "react";
import { API } from "aws-amplify";
import { listGroupByCategory } from "../../../graphql-custom/group/queries";
import { getReturnData } from "../../../utility/Util";
import { useRouter } from "next/router";
import { useListPager } from "../../../utility/ApiHelper";
import InfinitScroller from "../../layouts/extra/InfinitScroller";

const Groups = () => {
  const [loading, setLoading] = useState(false);
  const [groups, setGroups] = useState({});
  const router = useRouter();
  const [followedGroupsCounter, setFollowedGroupsCounter] = useState(0);

  const [nextGroups] = useListPager({
    query: listGroupByCategory,
    variables: {
      limit: 18,
    },
    nextToken: groups.nextToken,
    authMode: "AMAZON_COGNITO_USER_POOLS",
  });

  const fetchGroups = async () => {
    try {
      if (!loading) {
        setLoading(true);

        const resp = await nextGroups();
        if (resp) {
          setGroups((nextPosts) => {
            return {
              ...nextPosts,
              items: [...nextPosts.items, ...resp],
            };
          });
        }

        setLoading(false);
      }
    } catch (ex) {
      setLoading(false);
      console.log(ex);
    }
  };

  const getGroupsByCategory = async () => {
    try {
      setLoading(true);
      let resp = await API.graphql({
        query: listGroupByCategory,
        variables: {
          limit: 18,
        },
      });
      resp = getReturnData(resp);
      setGroups(resp);
      setLoading(false);
    } catch (ex) {
      setLoading(false);
      console.log(ex);
    }
  };

  useEffect(() => {
    getGroupsByCategory();
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
        <SimpleBar style={{ maxHeight: 456 }}>
          <div className={"groupsSelectContainer px-[40px] pb-[24px]"}>
            <InfinitScroller
              onNext={fetchGroups}
              className={"pb-[20px]"}
              loading={loading}
            >
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
            </InfinitScroller>
          </div>
        </SimpleBar>

        <div className={"h-[104px] border-t-[1px] border-caak-yinbaisilver"}>
          <div className="text-white text-14px flex items-center justify-between pt-[26px]">
            <Button
              disabled={followedGroupsCounter < 3}
              onClick={() => {
                if (followedGroupsCounter !== 0) {
                  if (router.query.isModal) {
                    router.replace(
                      {
                        pathname: router.pathname,
                        query: {
                          ...router.query,
                          signInUp: "complete",
                        },
                      },
                      "/signInUp/complete",
                      { shallow: true, scroll: false }
                    );
                  } else {
                    router.replace("/signInUp/complete", undefined, {
                      shallow: true,
                      scroll: false,
                    });
                  }
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

export default Groups;
