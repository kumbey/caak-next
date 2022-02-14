import Head from "next/head";
import Const from "../src/utility/Consts";
import { API } from "aws-amplify";
import {listBoostedPostByStatusOrderByEndDate, searchPosts} from "../src/graphql-custom/post/queries";
import {getReturnData, shuffleArray} from "../src/utility/Util";
import { useEffect, useState, Fragment } from "react";
import { useUser } from "../src/context/userContext";
import { listGroupByUserAndRoleForYou } from "../src/graphql-custom/GroupUsers/queries";
import { listUsersbyFollowingForYou } from "../src/graphql-custom/user/queries";
import Card from "../src/components/card/FeedCard";
import useFeedLayout from "../src/hooks/useFeedLayout";
import useMediaQuery from "../src/components/navigation/useMeduaQuery";
import { useWrapper } from "../src/context/wrapperContext";
import { useListPager } from "../src/utility/ApiHelper";
import InfinitScroller from "../src/components/layouts/extra/InfinitScroller";
import { feedType } from "../src/components/navigation/sortButtonTypes";
import FeedSortButtons from "../src/components/navigation/FeedSortButtons";
import Button from "../src/components/button";
import { useRouter } from "next/router";
import {
  onCreateReactions,
  onDeleteReactions,
} from "../src/graphql/subscriptions";
import FeedCardSkeleton from "../src/components/skeleton/FeedCardSkeleton";

const Foryou = () => {
  const { user, isLogged } = useUser();
  const router = useRouter();
  const ForYouLayout = useFeedLayout("default");
  const isTablet = useMediaQuery("screen and (max-device-width: 767px)");
  const { setFeedSortType } = useWrapper();
  const [loading, setLoading] = useState(false);
  const [forYouPosts, setForYouPosts] = useState({
    items: [],
    nextToken: null,
  });
  const [forYouPostsFilter, setForYouPostsFilter] = useState([]);
  const [subscribedReactionPost, setSubscribedReactionPost] = useState(null);
  const [render, setRender] = useState(0);
  const subscriptions = {};
  const [boostedPosts, setBoostedPosts] = useState({
    items: [],
  });
  const [isCardLoading, setIsCardLoading] = useState(true);

  const [nextForYouPosts] = useListPager({
    query: searchPosts,
    variables: {
      filter: {
        status: { eq: "CONFIRMED" },
        or: forYouPostsFilter,
        user_id: { ne: user.id },
      },
      limit: 20,
      sort: { field: "createdAt", direction: "desc" },
    },
    authMode: "AMAZON_COGNITO_USER_POOLS",
    nextToken: forYouPosts.nextToken,
    ssr: false,
  });

  const fetchBoostedPosts = async () => {
    const date = new Date();
    const now = date.toISOString();
    try {
      let resp = await API.graphql({
        query: listBoostedPostByStatusOrderByEndDate,
        variables: {
          status: "ACTIVE",
          sortDirection: "DESC",
          end_date: { gt: now },
        },
        authMode: "AWS_IAM",
      });
      resp = getReturnData(resp);
      shuffleArray(resp.items);
      setBoostedPosts(resp);
    } catch (ex) {
      console.log(ex);
    }
  };

  let frequency = 5;
  let boostedIdx = 0;
  const renderElement = (index) => {
    if (boostedPosts.items.length > 0) {
      if (index === (frequency + boostedPosts.items.length)) {
        if (boostedPosts.items.length - 1 > boostedIdx) {
          frequency = frequency + 10;
          boostedIdx++;
          return (
            <Card
              sponsored={true}
              post={boostedPosts.items[boostedIdx].post}
              className="ph:mb-4 sm:mb-4"
            />
          );
        } else {
          boostedIdx = 0;
          frequency = frequency + 1
        }
      }
    } else return null;
  };

  const fetchForYouPostsInfinite = async () => {
    try {
      if (!loading) {
        setLoading(true);

        const resp = await nextForYouPosts();
        if (resp) {
          setForYouPosts((prev) => ({
            ...prev,
            items: [...prev.items, ...resp],
          }));
        }

        setLoading(false);
      }
    } catch (ex) {
      setLoading(false);
      console.log(ex);
    }
  };

  const fetchUserFollowed = async () => {
    try {
      let resp = await API.graphql({
        query: listUsersbyFollowingForYou,
        variables: {
          followed_user_id: user.id,
        },
      });
      resp = getReturnData(resp);
      // setFollowedUsers(resp.items);
      return resp.items;
    } catch (ex) {
      console.log(ex);
    }
  };

  const fetchUserGroups = async () => {
    try {
      const groups = [];
      const roles = ["ADMIN", "MEMBER", "MODERATOR"];
      for (let i = 0; i <= roles.length; i++) {
        let resp = await API.graphql({
          query: listGroupByUserAndRoleForYou,
          variables: {
            user_id: user.id,
            role: { eq: roles[i] },
          },
        });
        resp = getReturnData(resp);
        groups.push(...resp.items);
      }
      // setUserGroups(groups);
      return groups;
    } catch (ex) {
      console.log(ex);
    }
  };

  const fetchForYouPosts = async ({ groups, users }) => {
    setLoading(true);
    try {
      const groupAndUsers = groups.concat(users);
      const filter = groupAndUsers.map((item) => {
        if (item?.user) {
          return { user_id: { eq: item.user.id } };
        } else return { group_id: { eq: item.group_id } };
      });
      setForYouPostsFilter(filter);
      let resp = await API.graphql({
        query: searchPosts,
        variables: {
          filter: {
            status: { eq: "CONFIRMED" },
            or: filter,
            user_id: { ne: user.id },
          },
          limit: 20,
          sort: { field: "createdAt", direction: "desc" },
        },
      });
      resp = getReturnData(resp);
      setForYouPosts(resp);
      setLoading(false);
    } catch (ex) {
      setLoading(false);
      console.log(ex);
    }
  };

  const subscribeOnReaction = () => {
    try {
      subscriptions.onCreateReactions = API.graphql({
        query: onCreateReactions,
      }).subscribe({
        next: (data) => {
          const onData = getReturnData(data, true);
          setSubscribedReactionPost({ ...onData, type: "CREATE" });
        },
      });
      subscriptions.onDeleteReactions = API.graphql({
        query: onDeleteReactions,
      }).subscribe({
        next: (data) => {
          const onData = getReturnData(data, true);
          setSubscribedReactionPost({ ...onData, type: "DELETE" });
        },
      });
    } catch (ex) {
      console.log(ex);
    }
  };

  useEffect(() => {
    if (subscribedReactionPost) {
      const postIndex = forYouPosts.items.findIndex((item) => {
        if (item.post) {
          return item.post.id === subscribedReactionPost.item_id;
        } else {
          return item.id === subscribedReactionPost.item_id;
        }
      });
      if (postIndex !== -1) {
        const post = forYouPosts.items[postIndex];
        if (post.post) {
          forYouPosts.items[postIndex].post.reacted =
            subscribedReactionPost.type === "CREATE";
        } else {
          forYouPosts.items[postIndex].reacted =
            subscribedReactionPost.type === "CREATE";
        }
        setRender(render + 1);
      }
    }
    //eslint-disable-next-line
  }, [subscribedReactionPost]);

  useEffect(()=> {
    fetchBoostedPosts().then(() => setIsCardLoading(false));
  },[])

  useEffect(() => {
    if (isLogged) {
      subscribeOnReaction();
      fetchUserGroups().then((groups) => {
        fetchUserFollowed().then((users) =>
          fetchForYouPosts({ groups, users })
        );
      });
    }
    return () => {
      Object.keys(subscriptions).map((key) => {
        subscriptions[key].unsubscribe();
        return true;
      });
    };
    //eslint-disable-next-line
  }, [isLogged]);

  useEffect(() => {
    setFeedSortType("FORYOU");
  }, [setFeedSortType]);

  return (
    <>
      <Head>
        <title>Танд - {Const.siteMainTitle}</title>
      </Head>
      <div className={"pt-[54px]"}>
        <ForYouLayout {...(isLogged ? { columns: 3 } : { columns: 2 })}>
          <FeedSortButtons
            feed
            items={feedType}
            initialSort={"FORYOU"}
            hide={isLogged && !isTablet}
            containerClassname={"mb-[19px] justify-center"}
            direction={"row"}
          />
          {isLogged ? (
            <InfinitScroller
              onNext={fetchForYouPostsInfinite}
              loading={loading}
            >
              {forYouPosts.items.map((data, index) => {
                return (
                  <Fragment key={index}>
                    {renderElement(index)}
                    {!isCardLoading ? !boostedPosts.items.find(
                      (item) => item.post.id === data.id
                    ) && (
                      <Card
                        post={data}
                        className="ph:mb-4 sm:mb-4"
                      />
                    ) : <FeedCardSkeleton/>}
                  </Fragment>
                );
              })}
            </InfinitScroller>
          ) : (
            <div
              className={"mt-[100px] flex items-center justify-center w-full"}
            >
              <Button
                onClick={() => {
                  router.push(
                    {
                      pathname: router.pathname,
                      query: {
                        ...router.query,
                        signInUp: "signUp",
                        isModal: true,
                      },
                    },
                    `/signInUp/signUp`,
                    { shallow: true }
                  );
                }}
                skin={"primary"}
              >
                Саак-д нэгдэх
              </Button>
            </div>
          )}
        </ForYouLayout>
      </div>
    </>
  );
};

export default Foryou;
