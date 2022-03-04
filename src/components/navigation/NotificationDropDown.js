import { useEffect, useRef, useState } from "react";
import Notification from "./Notification";
import { useUser } from "../../context/userContext";
import { getReturnData } from "../../utility/Util";
import { useListPager } from "../../utility/ApiHelper";
import {
  getNotification,
  listNotificationByUser,
} from "../../graphql-custom/notification/queries";
import API from "@aws-amplify/api";
import { graphqlOperation } from "@aws-amplify/api-graphql";
import { onNoficationAdded } from "../../graphql-custom/notification/subscription";
import {
  methodNoitification,
  updateNotification,
} from "../../graphql-custom/notification/mutation";
import { getPostItems } from "../../graphql-custom/postItems/queries";
import { getComment } from "../../graphql-custom/comment/queries";
import Loader from "../loader";
import useInfiniteScroll from "../../hooks/useFetch";
import { useRouter } from "next/router";
import { getPost } from "../../graphql-custom/post/queries";
import useMediaQuery from "./useMeduaQuery";
import useScrollBlock from "../../hooks/useScrollBlock";
import useUpdateEffect from "../../hooks/useUpdateEffect";
import emptyNotificationImage from "../../../public/assets/images/Empty-Notification.svg";
import SimpleBar from "simplebar-react";
import { getUserBalance } from "../../graphql-custom/user/queries";

const NotificationDropDown = ({ isOpen }) => {
  const [notifications, setNotifications] = useState([]);
  const isTablet = useMediaQuery("screen and (max-device-width: 767px)");
  const { user, isLogged } = useUser();
  const [loading, setLoading] = useState(false);
  const [subscripNotifcation, setSubscripNotification] = useState();
  const [blockScroll, allowScroll] = useScrollBlock();

  const subscriptions = {};
  const router = useRouter();
  const notificationRef = useRef();

  const [nextNotification] = useListPager({
    query: listNotificationByUser,
    variables: {
      to: user.id,
      sortDirection: "DESC",
      limit: 20,
    },
  });

  const [setNotificationScroll] = useInfiniteScroll(
    notifications,
    setNotifications,
    notificationRef
  );

  const getUserData = async (user_id) => {
    return API.graphql({
      query: getUserBalance,
      variables: { id: user_id },
    });
  };

  const fetchNotifications = async (data, setData) => {
    try {
      if (!loading) {
        setLoading(true);

        const resp = await nextNotification();

        if (resp) {
          setData([...data, ...resp]);
        }
        setLoading(false);
      }
    } catch (ex) {
      setLoading(false);
      console.log(ex);
    }
  };

  const fetchNotification = async (id) => {
    try {
      let resp = await API.graphql(
        graphqlOperation(getNotification, { id: id })
      );
      resp = getReturnData(resp);
      if (resp.type === "BALANCE") {
        let fetchedUser = await getUserData(user.id);
        fetchedUser = getReturnData(fetchedUser);
        user.balance.balance = fetchedUser.balance.balance;
      }
      setNotifications([resp, ...notifications]);
    } catch (ex) {
      console.log(ex);
    }
  };

  const handleAllNotifications = async () => {
    try {
      await API.graphql(
        graphqlOperation(methodNoitification, {
          method: "SeenALL",
          user_id: user.id,
        })
      );

      notifications.map((item, index) => {
        if (item.seen === "FALSE") {
          notifications[index].seen = "TRUE";
        }
        return null;
      });
    } catch (ex) {
      console.log(ex);
    }
  };

  const handleNotificationClick = async (index) => {
    try {
      const item = notifications[index];
      console.log(item);
      if (item.seen === "FALSE") {
        await API.graphql(
          graphqlOperation(updateNotification, {
            input: {
              id: item.id,
              seen: "TRUE",
              expectedVersion: item.version,
            },
          })
        );
      }

      if (item.seen === "FALSE") notifications[index].seen = "TRUE";

      if (
        item.action === "POST_PENDING" ||
        item.action === "POST_ARCHIVED" ||
        item.action === "POST_DRAFT" ||
        item.action === "POST_CONFIRMED" ||
        item.action === "POST_REPORTED" ||
        item.action === "REACTION_POST"
      ) {
        router.push({
          pathname: `/post/view/${item.item_id}`,
        });
      } else if (item.action === "REACTION_POST_ITEM") {
        let resp = await API.graphql(
          graphqlOperation(getPostItems, { id: item.item_id })
        );
        resp = getReturnData(resp);
        router.push({
          pathname: `/post/view/${resp.post_id}`,
        });
      } else if (item.action === "POST_ITEM_COMMENT_WRITED") {
        let resp = await API.graphql(
          graphqlOperation(getComment, { id: item.item_id })
        );
        resp = getReturnData(resp);
        resp = await API.graphql(
          graphqlOperation(getPostItems, { id: resp.post_item_id })
        );
        resp = getReturnData(resp);
        router.push({
          pathname: `/post/view/${resp.post_id}/${resp.id}`,
        });
      } else if (item.action === "POST_COMMENT_WRITED") {
        let resp = await API.graphql(
          graphqlOperation(getComment, { id: item.item_id })
        );
        resp = getReturnData(resp);
        resp = await API.graphql(
          graphqlOperation(getPost, { id: resp.post_id })
        );
        resp = getReturnData(resp);
        router.push(
          {
            pathname: `/post/view/${resp.id}`,
            query: { jumpToComment: item.item_id },
          },
          `/post/view/${resp.id}`
        );
      } else if (item.action === "USER_FOLLOWED") {
        router.push({
          pathname: `/user/${item.item_id}/profile`,
        });
      } else if (item.action === "POST_REPORTED") {
        let resp = await API.graphql(
          graphqlOperation(getPost, { id: item.item_id })
        );
        resp = getReturnData(resp);
        router.push(
          {
            pathname: `/post/view/${resp.id}`,
          },
          `/post/view/${resp.id}`
        );
      } else if (
        item.action === "BALANCE_DECREASE" ||
        item.action === "BALANCE_INCREASE"
      ) {
        router.push(
          {
            pathname: `/user/${user.id}/dashboard`,
            query: {
              activeIndex: 2,
            },
          },
          `/user/${user.id}/dashboard`
        );
      }
    } catch (ex) {
      if (
        ex.errors &&
        ex.errors[0].errorType === "DynamoDB:ConditionalCheckFailedException"
      ) {
        notifications[index].seen = "TRUE";
      } else console.log(ex);
    }
  };

  const subscrip = async () => {
    subscriptions.onNoficationAdded = await API.graphql({
      query: onNoficationAdded,
      variables: {
        section: "USER",
        to: user.id,
      },
    }).subscribe({
      next: (data) => {
        const onData = getReturnData(data, true);
        setSubscripNotification(onData);
      },
      error: (error) => {
        console.warn(error);
      },
    });
  };

  useEffect(() => {
    if (isLogged) {
      fetchNotifications(notifications, setNotifications);
      setNotificationScroll(fetchNotifications);
    }
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (isLogged) {
      subscrip();
    }

    return () => {
      Object.keys(subscriptions).map((key) => {
        subscriptions[key].unsubscribe();
        return true;
      });
    };
    // eslint-disable-next-line
  }, [isLogged]);

  useEffect(() => {
    if (subscripNotifcation) {
      fetchNotification(subscripNotifcation.id);
    }
    // eslint-disable-next-line
  }, [subscripNotifcation]);

  useUpdateEffect(() => {
    if (isOpen && isTablet) {
      blockScroll();
    } else {
      allowScroll();
    }
  }, [isOpen, isTablet]);
  return (
    <div
      id={"notificationDropdown"}
      // onClick={(e) => e.stopPropagation()}
      className={`${
        !isOpen && "hidden"
      } notificationMobile bg-caak-washme overflow-hidden dropdown rounded-[4px] right-0 md:-right-10 fixed md:absolute z-2 mt-[54px] md:z-50 top-0 w-full md:w-[384px] md:mb-2 lg:mb-2 md:bottom-0 md:top-8 md:my-2 flex flex-col bg-white cursor-auto`}
    >
      <div
        className={
          "bg-white flex flex-row items-center justify-between w-full px-[14px] pb-2 pt-3 border-b border-t md:border-t-0"
        }
      >
        <span
          className={
            "text-caak-generalblack font-medium text-20px md:text-16px"
          }
        >
          Мэдэгдэл
        </span>
        <div className={"flex items-center justify-center"}>
          <div className={"w-[24px] h-[24px] cursor-pointer"}>
            <span
              onClick={() => handleAllNotifications()}
              className={
                "icon-fi-rs-checkall text-caak-darkBlue  text-22px font-medium"
              }
            />
          </div>
          <div
            className={
              "flex md:hidden ml-[10px] w-[24px] h-[24px] items-center justify-center bg-caak-titaniumwhite rounded-full"
            }
          >
            <span className={"icon-fi-rs-close text-[12px]"} />
          </div>
        </div>
      </div>
      <SimpleBar
        className={
          "max-h-full md:max-h-[559px] rounded-b-[4px] pb-[200px] md:pb-0"
        }
      >
        <div
          className={
            "notification_body overflow-hidden rounded-b-[4px] h-full flex flex-col bg-caak-washme p-0"
          }
        >
          {notifications.length === 0 ? (
            <div
              className={
                "flex flex-col h-full w-full items-center justify-center"
              }
            >
              <div className={"w-[120.39px] h-[124px]"}>
                <img
                  alt={""}
                  src={emptyNotificationImage.src}
                  className={"w-full h-full"}
                />
              </div>
              <div className={"flex flex-col items-center mt-[14px]"}>
                <p className={"text-caak-generalblack text-[17px]"}>
                  Таньд мэдэгдэл ирээгүй байна.
                </p>
                <p className={"text-caak-darkBlue text-[15px] mt-[8px]"}>
                  Өдрийг сайхан өнгөрүүлээрэй!
                </p>
              </div>
            </div>
          ) : (
            notifications.map((item, index) => {
              return (
                <Notification
                  onClick={() => handleNotificationClick(index)}
                  key={index}
                  item={item}
                />
              );
            })
          )}
          <div
            ref={notificationRef}
            className={"flex justify-center items-center"}
          >
            <Loader
              className={`${
                loading ? "opacity-100" : "opacity-0"
              } bg-caak-primary `}
            />
          </div>
        </div>
      </SimpleBar>
    </div>
  );
};

export default NotificationDropDown;
