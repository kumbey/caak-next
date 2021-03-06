import Loader from "../loader";
import { useEffect, useRef, useState } from "react";
import {
  arrayMove,
  rectSortingStrategy,
  SortableContext,
} from "@dnd-kit/sortable";
import {
  closestCenter,
  DndContext,
  DragOverlay,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import Switch from "../userProfile/Switch";
import AddPostCardSmall from "../card/AddPostCardSmall";
import { getFileUrl, getGenderImage, isAdmin } from "../../utility/Util";
import Video from "../video";
import { useRouter } from "next/router";
import useUpdateEffect from "../../hooks/useUpdateEffect";
import { Editor } from "@tinymce/tinymce-react";
import CardsWrapper from "./CardsWrapper";
import SortableCard from "./SortableCard";
import sanitizeHtml from "sanitize-html";
import useMediaQuery from "../navigation/useMeduaQuery";
import DatePicker from "react-datepicker";
import Button from "../button";
import moment from "moment";
import Consts from "../../utility/Consts";

const UploadedMediaEdit = ({
  setPost,
  post,
  errors,
  loading,
  selectedGroup,
  valid,
  isEditing,
  setIsEditing,
}) => {
  const [activeId, setActiveId] = useState(1);
  const [link, setLink] = useState(null);
  const [scrapedData, setScrapedData] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [videoDurationError, setVideoDurationError] = useState(false);
  const isTablet = useMediaQuery("screen and (max-device-width: 767px)");
  const [isImageCaptionSectionVisible, setIsImageCaptionSectionVisible] =
    useState(!isTablet);
  const [allowComment, setAllowComment] = useState(
    post?.commentType ? post.commentType : false
  );
  const [isSuperAdmin, setIsSuperAdmin] = useState(false);
  const [adminTextEditor, setAdminTextEditor] = useState(
    post.onlyBlogView
      ? post.onlyBlogView
      : selectedGroup?.role_on_group === "ADMIN"
      ? "TRUE"
      : "FALSE"
  );
  const [startDate, setStartDate] = useState(moment(post.createdAt)._d);
  const [isDraft, setIsDraft] = useState(post.status === "DRAFT");
  const [isPublishDateOn, setIsPublishDateOn] = useState(false);
  const [caakContent, setCaakContent] = useState(post?.owned === "CAAK");
  const sensors = useSensors(useSensor(MouseSensor), useSensor(TouchSensor));
  const [sortItems, setSortItems] = useState(post.items);
  const [viewDescription, setViewDescription] = useState(
    post.description ? post.description : !isTablet
  );

  const router = useRouter();
  const editorRef = useRef(null);

  const thumbnailImageHandler = (item) => {
    if (item?.file) {
      if (item.file.url) {
        return item.file.url;
      } else {
        if (!getFileUrl(item.file).includes("undefined")) {
          return getFileUrl(item.file);
        }
      }
    } else {
      return getGenderImage("default").src;
    }
  };

  const maxLengths = {
    title: 300,
    description: 1000,
    imageDescription: 1000,
  };
  const popItem = (index_arg) => {
    if (activeIndex === post.items.length - 1 && activeIndex !== 0) {
      setActiveIndex(activeIndex - 1);
    }
    const popIndex = post.items.findIndex((_, index) => index === index_arg);
    const postsArr = post.items;
    postsArr.splice(popIndex, 1);

    postsArr.map((item, index) => {
      if (typeof item.id !== "string") {
        item.id = index + 1;
      }
    });

    setPost((prev) => ({
      ...prev,
      items: postsArr,
    }));
    setIsEditing(true);
  };

  const featuredPostHandler = (index) => {
    const newItems = arrayMove(post.items, index, 0);
    setPost({ ...post, items: newItems });
    setActiveIndex(0);
  };

  const captionHandler = ({ business, value }) => {
    const arr = [...post.items];
    const currentItem = arr[activeIndex];
    if (business) {
      currentItem.title = value;
    } else {
      currentItem.title = value.target.value;
    }
    setPost({ ...post, items: arr });
  };

  const postTitleHandler = (e) => {
    setPost((prev) => ({ ...prev, title: e.target.value }));
  };

  const onDragStartHandler = (event) => {
    setActiveIndex(event.active.data.current.sortable.index);
  };

  const onDragEndHandler = (event) => {
    const { active, over } = event;
    if (!over) return null;
    if (active.id === over.id) return null;
    const items = post.items;
    const oldIndex = items.findIndex(function (item) {
      return item.id === active.id;
    });
    const newIndex = items.findIndex(function (item) {
      return item.id === over.id;
    });
    const newItems = arrayMove(items, oldIndex, newIndex);
    setPost({ ...post, items: newItems });
    setActiveIndex(newIndex);
    setActiveId(parseInt(event.active.id));
  };

  function auto_grow(element) {
    element.target.style.height = "5px";
    element.target.style.height = element.target.scrollHeight + "px";
  }

  const browserTabCloseHandler = (e) => {
    e.preventDefault(); // If you prevent default behavior in Mozilla Firefox prompt will always be shown
    e.returnValue = "";
  };
  const isAdminAsync = async () => {
    return await isAdmin();
  };
  const scrapper = async () => {
    if (link) {
      fetch("/api/meta", {
        method: "post",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          url: link,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          setScrapedData(data);
        });
    }
  };

  useUpdateEffect(() => {
    if (scrapedData) {
      if (scrapedData.success) {
        if (scrapedData.ogImage.url) {
          const items = post.items;
          items[0].file.url = scrapedData.ogImage.url;
          setPost((prev) => ({
            ...prev,
            title: scrapedData.ogTitle,
            description: scrapedData.ogDescription,
            items: [...items],
          }));
        } else {
          setPost((prev) => ({
            ...prev,
            title: scrapedData.ogTitle,
            description: scrapedData.ogDescription,
          }));
        }
      } else {
        console.log(scrapedData.error);
      }
    }
  }, [scrapedData]);

  useUpdateEffect(() => {
    setIsEditing(true);
  }, [
    post.items,
    post.title,
    post.description,
    post.group_id,
    caakContent,
    adminTextEditor,
    allowComment,
    post.items.length,
    isDraft,
    startDate,
    isPublishDateOn,
  ]);

  useUpdateEffect(() => {
    if (isEditing) {
      const onRouteChangeStart = () => {
        const askBeforeRouteChange = window.confirm(
          "???? ???????????????? ???????????????? ?????????? ?????"
        );
        if (!askBeforeRouteChange) {
          router.events.emit("routeChangeError");
          throw "Abort route change. Please ignore this error.";
        }
      };
      if (window) {
        router.beforePopState(() => {
          const askBeforeRouteChange = window.confirm(
            "???? ???????????????? ???????????????? ?????????? ?????"
          );
          if (!askBeforeRouteChange) {
            router.events.emit("routeChangeError");
            throw "Abort route change. Please ignore this error.";
          }
        });
        window.onbeforeunload = browserTabCloseHandler;
      }
      router.events.on("routeChangeStart", onRouteChangeStart);
      return () => {
        router.events.off("routeChangeStart", onRouteChangeStart);
        if (window) {
          window.onbeforeunload = null;
        }
        router.beforePopState(() => {
          return true;
        });
      };
    }

    // eslint-disable-next-line
  }, [post, router, isEditing, selectedGroup]);

  useEffect(() => {
    setIsImageCaptionSectionVisible(!isTablet);
    setViewDescription(!isTablet);
    //eslint-disable-next-line
  }, [isTablet]);

  useEffect(() => {
    let cContent;
    if (caakContent) {
      cContent = { owned: "CAAK" };
    } else {
      delete post.owned;
    }
    setPost({
      ...post,
      commentType: !!allowComment,
      ...cContent,
      status: isDraft ? "DRAFT" : "PENDING",
    });
    // eslint-disable-next-line
  }, [allowComment, caakContent, isDraft]);

  useUpdateEffect(() => {
    if (!isPublishDateOn) {
      setStartDate(new Date());
    }
  }, [isPublishDateOn]);

  useUpdateEffect(() => {
    if (startDate) {
      if (startDate < new Date()) {
        setPost({
          ...post,
          createdAt: startDate.toISOString(),
        });
      }
    } else {
      setStartDate(null);
    }
    //eslint-disable-next-line
  }, [startDate, isPublishDateOn]);

  useEffect(() => {
    isAdminAsync().then((e) => setIsSuperAdmin(e));
  }, []);

  useUpdateEffect(() => {
    setPost({
      ...post,
      onlyBlogView: adminTextEditor,
    });
    // eslint-disable-next-line
  }, [adminTextEditor]);

  useUpdateEffect(() => {
    if (adminTextEditor === "FALSE") {
      const postItems = post.items;
      postItems.map((item) => {
        item.title = sanitizeHtml(item.title, {
          allowedTags: [],
          allowedAttributes: {},
          allowedIframeHostnames: [],
        });
      });
      const cleanDesc = sanitizeHtml(post.description, {
        allowedTags: [],
        allowedAttributes: {},
        allowedIframeHostnames: [],
      });
      setPost({
        ...post,
        items: postItems,
        onlyBlogView: adminTextEditor,
        description: cleanDesc,
      });
    }
    // eslint-disable-next-line
  }, [adminTextEditor]);

  useEffect(() => {
    setSortItems([...post.items]);
  }, [post]);

  useEffect(() => {
    if (selectedGroup) {
      if (selectedGroup.role_on_group !== "ADMIN") {
        setAdminTextEditor("FALSE");
      } else {
        setAdminTextEditor("TRUE");
      }
    }
    //eslint-disable-next-line
  }, [selectedGroup]);

  return (
    <div>
      {errors && (
        <div
          className={
            "flex flex-row justify-between bg-caak-red bg-opacity-70 w-full p-3.5 px-6 my-4"
          }
        >
          <span className={"text-15px text-white font-normal"}>
            ?????????? ?????????? ?????????? ???????????????? ?????????? ????????????.
          </span>
          <span
            className={
              "cursor-pointer text-14px font-medium text-white underline tracking-wider"
            }
          >
            ?????????????????????? ??????????..
          </span>
        </div>
      )}
      <div className={"px-[18px] mt-[12px]"}>
        <div className={"w-full block relative"}>
          <div className={"w-full block relative"}>
            <textarea
              onFocus={auto_grow}
              onInput={auto_grow}
              placeholder={"????????"}
              value={link || ""}
              onChange={(e) => setLink(e.target.value)}
              className={`addPostTextarea overflow-hidden min-h-[44px] text-[15px] pb-[25px]   text-caak-extraBlack w-full rounded-[3px] border border-caak-titaniumwhite  sm:text-sm  focus:ring-2 focus:ring-opacity-20`}
            />
          </div>
          <button onClick={() => scrapper()}>Scrap</button>
        </div>
        <div className={"w-full block relative"}>
          <div className={"w-full block relative"}>
            <textarea
              onFocus={auto_grow}
              onInput={auto_grow}
              maxLength={maxLengths.title}
              placeholder={"????????????"}
              value={post.title}
              onChange={postTitleHandler}
              className={`addPostTextarea overflow-hidden min-h-[44px] text-[15px] pb-[25px]   text-caak-extraBlack w-full rounded-[3px] border border-caak-titaniumwhite  sm:text-sm  focus:ring-2 focus:ring-opacity-20  ${
                post.title?.length === maxLengths.title
                  ? "ring-caak-red border-caak-red"
                  : "focus:ring-caak-primary focus:border-caak-primary"
              } ${
                !valid && post.title?.length === 0
                  ? "ring-caak-red border-caak-red"
                  : ""
              }`}
            />
            <span
              className={
                "absolute bottom-1 -translate-y-1/2 right-[12px] text-[12px] text-caak-darkBlue"
              }
            >
              {post.title?.length || 0}/{maxLengths.title}
            </span>
          </div>

          <div className="flex justify-start">
            {post.title?.length === maxLengths.title ? (
              <p className={"text-[13px] text-caak-red"}>
                ???????????????? ???????????? {maxLengths.title} ???????????????????? ???????????????? ??????????
              </p>
            ) : !valid && post.title?.length === 0 ? (
              <p className={"text-[13px] text-caak-red"}>???????????? ?????????????? ????</p>
            ) : null}
          </div>
        </div>

        <div
          className={`w-full relative block mt-[12px] ${
            !viewDescription ? "hidden" : ""
          }`}
        >
          {post.onlyBlogView && adminTextEditor === "TRUE" ? (
            <Editor
              apiKey={"d8002ouvvak8ealdsmv07avyednf4ab12unnpjf1o2fjshj7"}
              onInit={(evt, editor) => (editorRef.current = editor)}
              onEditorChange={(e) => {
                setPost((prev) => ({ ...prev, description: e }));
              }}
              value={post.description}
              init={{
                convert_urls: false,
                valid_elements:
                  "a[href|target=_blank],strong/b,em/i,br,li,ol,ul,span,br",
                extended_valid_elements: [
                  "p[style|class=tinymce-p]",
                  "li[style|class=tinymce-p]",
                  "ol[style|class=tinymce-ol]",
                  "ul[style|class=tinymce-ul]",
                  "span[style|class=tinymce-span]",
                ],
                height: 200,
                menubar: false,
                plugins: ["advlist lists link", "paste wordcount"],
                toolbar:
                  "bold italic | bullist numlist link | alignleft aligncenter " +
                  "alignright alignjustify | outdent indent | " +
                  "undo redo",
              }}
            />
          ) : (
            <div>
              <textarea
                onFocus={auto_grow}
                onInput={auto_grow}
                maxLength={maxLengths.description}
                placeholder={"??????????"}
                style={{ resize: "none" }}
                value={post.description}
                onChange={(e) =>
                  setPost((prev) => ({ ...prev, description: e.target.value }))
                }
                className={`addPostTextarea pb-[25px] overflow-y-scroll min-h-[68px] text-[15px] text-caak-extraBlack w-full rounded-[3px] border border-caak-titaniumwhite  sm:text-sm focus:border-caak-primary focus:ring-2 focus:ring-opacity-20 ${
                  post.description?.length === maxLengths.description
                    ? "ring-caak-red border-caak-red"
                    : "focus:ring-caak-primary focus:border-caak-primary"
                }`}
                rows={2}
              />
              {/* border-2 border-rose-600 text-gray-500 rounded-lg shadow-sm
          focus:outline-none focus:ring focus:ring-rose-200
          focus:border-rose-500
          */}
              <span
                className={
                  "absolute bottom-1 -translate-y-1/2 right-[12px] text-[12px] text-caak-darkBlue"
                }
              >
                {post.description?.length || 0}/{maxLengths.description}
              </span>
            </div>
          )}
        </div>
        <div className="flex justify-between">
          <div className="flex justify-start">
            {post.description?.length === maxLengths.description &&
            viewDescription ? (
              <p className={"text-[13px] text-caak-red"}>
                ???????????????? ???????????? {maxLengths.description} ???????????????????? ????????????????
                ??????????
              </p>
            ) : null}
          </div>
          <div
            onClick={() => setViewDescription(!viewDescription)}
            className={`flex flex-row items-center ${
              viewDescription ? "text-caak-generalblack" : "text-caak-primary"
            }  justify-end cursor-pointer`}
          >
            <div
              className={"flex items-center justify-center w-[14px] h-[14px]"}
            >
              <span
                className={`${
                  viewDescription ? "icon-fi-rs-minus" : "icon-fi-rs-add-l "
                } text-[9.33px]`}
              />
            </div>
            <p className={"text-[13px]"}>??????????</p>
          </div>
        </div>
      </div>

      <div
        className={`relative border-caak-titaniumwhite ${
          post ? "" : "border-dashed"
        } ${
          isImageCaptionSectionVisible ? "pb-0 md:pb-[50px]" : "pb-[12px]"
        } border rounded-[3px] p-[12px] mx-[18px] mt-[22px]`}
      >
        {loading && (
          <div
            className={
              "flex items-center justify-center cursor-not-allowed text-center absolute w-full h-screen max-h-full top-0 left-0 z-[4] bg-white bg-opacity-90"
            }
          >
            <Loader className={"bg-caak-primary"} />
          </div>
        )}
        <DndContext
          autoScroll={true}
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragStart={onDragStartHandler}
          onDragEnd={onDragEndHandler}
        >
          <SortableContext items={sortItems} strategy={rectSortingStrategy}>
            <CardsWrapper>
              {post.items.map((item, index) => {
                return (
                  <SortableCard
                    post={post}
                    setPost={setPost}
                    activeIndex={index}
                    onClickClose={() => popItem(index)}
                    setFeaturedPost={() => featuredPostHandler(index)}
                    active={activeIndex === index}
                    setActiveIndex={setActiveIndex}
                    key={item.id}
                    item={item}
                    index={index}
                  />
                );
              })}
              <AddPostCardSmall
                setVideoDurationError={setVideoDurationError}
                post={post}
                setPost={setPost}
              />
            </CardsWrapper>
          </SortableContext>
          <DragOverlay>
            {activeId ? (
              <div
                className={
                  "flex justify-center items-center bg-transparent rounded-[5px] w-[77px] h-[77px]"
                }
              >
                <div
                  className={
                    "bg-transparent rounded-[5px] w-[64px] h-[64px] relative"
                  }
                >
                  {/*<Image*/}
                  {/*  className={"rounded-[5px]"}*/}
                  {/*  alt={""}*/}
                  {/*  src={post.items[activeIndex].file.url}*/}
                  {/*  layout={"fill"}*/}
                  {/*  objectFit={"cover"}*/}
                  {/*/>*/}
                </div>
              </div>
            ) : null}
          </DragOverlay>
        </DndContext>
        <div
          onClick={() =>
            setIsImageCaptionSectionVisible(!isImageCaptionSectionVisible)
          }
          className={`flex flex-row items-center mt-[6px] mx-[18px] ${
            isImageCaptionSectionVisible
              ? "text-caak-generalblack"
              : "text-caak-primary"
          }  justify-end cursor-pointer`}
        >
          <div className={"flex items-center justify-center w-[14px] h-[14px]"}>
            <span
              className={`${
                isImageCaptionSectionVisible
                  ? "icon-fi-rs-minus"
                  : "icon-fi-rs-add-l "
              } text-[9.33px]`}
            />
          </div>
          <p className={"text-[13px]"}>?????????????? ??????????????</p>
        </div>
        <div
          className={`${
            isImageCaptionSectionVisible ? "" : "hidden"
          } flex flex-col sm:flex-row sm:h-[300px] mt-[20px]`}
        >
          <div
            style={{ flexBasis: `300px` }}
            className={
              "flex w-full flex-shrink-0 h-full relative bg-caak-liquidnitrogen rounded-[3px] border-[1px] border-caak-titaniumwhite"
            }
          >
            {post.items[activeIndex]?.file?.type?.startsWith("video") ? (
              <Video
                light={
                  post.items[activeIndex].thumbnail
                    ? post.items[activeIndex].thumbnail.hasOwnProperty("url")
                      ? post.items[activeIndex].thumbnail.url
                      : getFileUrl(post.items[activeIndex].thumbnail)
                    : getFileUrl(post.items[activeIndex].file)
                }
                initialAutoPlay={false}
                durationIndicator={true}
                videoFileId={
                  post.items[activeIndex].file.id
                    ? post.items[activeIndex].file.id
                    : null
                }
                videoClassname={"object-contain rounded-none"}
                src={thumbnailImageHandler(post.items[activeIndex])}
              />
            ) : (
              <img
                className={"object-contain w-full h-full rounded-none"}
                alt={""}
                src={thumbnailImageHandler(post.items[activeIndex])}
                // objectFit={"contain"}
                // layout={"fill"}
              />
            )}
          </div>
          <div
            // style={{ flexBasis: `366px` }}
            className={
              "addPostImageCaptionContainer w-full h-full sm:ml-[14px] mt-[20px] sm:mt-0 relative"
            }
          >
            <div className={"w-full h-full relative"}>
              <div className={"flex flex-col w-full h-full"}>
                {(post.onlyBlogView && adminTextEditor === "TRUE") || Consts.translatorUserId.some((id) => id === post.user_id) ? (
                  <div
                    className={
                      "flex flex-col w-full h-full h-[200px] md:h-full"
                    }
                  >
                    <Editor
                      apiKey={
                        "d8002ouvvak8ealdsmv07avyednf4ab12unnpjf1o2fjshj7"
                      }
                      onInit={(evt, editor) => (editorRef.current = editor)}
                      // initialValue={post.items[activeIndex].title}
                      onEditorChange={(e) => {
                        captionHandler({ business: true, value: e });
                      }}
                      value={post.items[activeIndex].title}
                      init={{
                        convert_urls: false,
                        valid_elements:
                          "a[href|target=_blank],strong/b,em/i,br,li,ol,ul,span,br",
                        extended_valid_elements: [
                          "p[style|class=tinymce-p]",
                          "li[style|class=tinymce-p]",
                          "ol[style|class=tinymce-ol]",
                          "ul[style|class=tinymce-ul]",
                          "span[style|class=tinymce-span]",
                        ],
                        height: "100%",
                        menubar: false,
                        plugins: [
                          "advlist autolink lists link preview anchor",
                          "paste wordcount",
                        ],
                        toolbar:
                          "bold italic | bullist numlist link | alignleft aligncenter " +
                          "alignright alignjustify | outdent indent | " +
                          "undo redo",
                      }}
                    />
                  </div>
                ) : (
                  <>
                    <div>
                      <textarea
                        placeholder={"?????????????? ??????????????"}
                        // style={{ resize: "none" }}
                        onChange={(e) => captionHandler({ value: e })}
                        value={post.items[activeIndex].title}
                        maxLength={maxLengths.imageDescription}
                        className={`addPostTextarea md:resize-none w-full max-h-[200px] md:h-full md:max-h-[100%] md:h-[300px] rounded-[3px] border-[1px] border-caak-titaniumwhite p-[18px]  focus:ring-2 focus:ring-opacity-20    ${
                          post.items[activeIndex].title?.length ===
                          maxLengths.imageDescription
                            ? "ring-caak-red border-caak-red"
                            : "focus:ring-caak-primary focus:border-caak-primary"
                        }`}
                      />
                    </div>
                    <span className={"text-[12px] self-end text-caak-darkBlue"}>
                      {post.items[activeIndex]?.title?.length || 0}/
                      {maxLengths.imageDescription}
                    </span>
                    <div className="flex justify-end items-end]">
                      {post.items[activeIndex].title?.length ===
                      maxLengths.imageDescription ? (
                        <p className={"text-[13px] text-caak-red"}>
                          ???????????????? ???????????? {maxLengths.imageDescription}{" "}
                          ???????????????????? ???????????????? ??????????
                        </p>
                      ) : null}
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      {videoDurationError ? (
        <div className="flex flex-row items-center mx-[22px] my-[5px] rounded-[8px] p-[5px] bg-red-200 max-w-[430px]">
          <span
            onClick={() => setVideoDurationError(false)}
            className="icon-fi-rs-close cursor-pointer text-[12px] p-[3px] border border-[#21293C] rounded-full"
          />
          <p className="text-[14px] text-[#21293C] ml-[10px] sm:mx-[10px]">
            ??????????????????, ???????? ???????????? 5 ???????????????? ???????????????? ??????????
          </p>
          <span className="icon-fi-rs-info text-[14px] text-[#21293C] hidden sm:flex" />
        </div>
      ) : null}

      <div
        className={
          "bg-white px-[28px] py-[20px] border-t-[1px] border-caak-titaniumwhite"
        }
      >
        <div className={"flex items-center justify-between"}>
          <p className={"text-caak-generalblack text-[16px] font-semibold"}>
            ???????????? ????????????????
          </p>
        </div>
        <div className={"w-[265px]"}>
          {selectedGroup && isSuperAdmin && (
            <div className={"flex flex-row justify-between mt-[16px]"}>
              <p className={"text-[15px] text-caak-generalblack"}>
                ???????? ??????????????
              </p>
              <Switch toggle={setCaakContent} active={caakContent} />
            </div>
          )}
          <div className={"flex flex-row justify-between mt-[16px]"}>
            <p className={"text-[15px] text-caak-generalblack"}>
              ?????????????????? ??????????????????
            </p>
            <Switch toggle={setAllowComment} active={allowComment} />
          </div>
          <div className={"flex flex-row justify-between mt-[16px]"}>
            <p className={"text-caak-generalblack text-[15px]"}>????????????</p>
            <Switch toggle={setIsDraft} active={isDraft} />
          </div>

          {(selectedGroup?.role_on_group === "ADMIN" ||
            selectedGroup?.role_on_group === "MODERATOR" ||
            isSuperAdmin || Consts.translatorUserId.some((id) => id === post.user_id)) && (
            <div className={"flex flex-row justify-between mt-[16px]"}>
              <p className={"text-[15px] text-caak-generalblack"}>
                ?????????? ????????????????????
              </p>
              <label
                onClick={() =>
                  setAdminTextEditor(
                    adminTextEditor === "TRUE" ? "FALSE" : "TRUE"
                  )
                }
                style={{ minWidth: "40px", height: "22px" }}
                className={`ml-1 cursor-pointer
                rounded-full 
                bg-caak-${
                  adminTextEditor === "TRUE" ? "algalfuel" : "titaniumwhite"
                }  
                flex items-center 
                justify-${adminTextEditor === "TRUE" ? "end" : "start"}`}
              >
                <span
                  style={{ width: "18px", height: "18px", marginInline: "2px" }}
                  className={`bg-white rounded-full`}
                />
              </label>
            </div>
          )}
          {isSuperAdmin && (
            <div className={"flex flex-row justify-between mt-[16px]"}>
              <p className={"text-[15px] text-caak-generalblack"}>
                ?????????????? ???????? ????????????????????
              </p>
              <label
                onClick={() => {
                  setIsPublishDateOn(!isPublishDateOn);
                }}
                style={{ minWidth: "40px", height: "22px" }}
                className={`ml-1 cursor-pointer
                rounded-full 
                bg-caak-${isPublishDateOn ? "algalfuel" : "titaniumwhite"}  
                flex items-center 
                justify-${isPublishDateOn ? "end" : "start"}`}
              >
                <span
                  style={{ width: "18px", height: "18px", marginInline: "2px" }}
                  className={`bg-white rounded-full`}
                />
              </label>
            </div>
          )}

          {isPublishDateOn && (
            <div
              className={
                "flex flex-row items-center addPostDatePicker mt-[16px]"
              }
            >
              <DatePicker
                maxDate={new Date()}
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                timeIntervals={60}
                showTimeSelect
                dateFormat={"yyyy/MM/dd, HH:mm"}
                calendarStartDay={1}
              />
              <Button
                onClick={() => setStartDate(new Date())}
                className={"ml-[8px] h-full"}
                skin={"primary"}
              >
                ????????
              </Button>
            </div>
          )}
          {/*<div className={"flex flex-row justify-between mt-[16px]"}>*/}
          {/*  <p className={"text-[15px] text-caak-generalblack"}>????????????</p>*/}
          {/*  <Switch toggle={setBoost} active={boost} />*/}
          {/*</div>*/}
        </div>
      </div>
    </div>
  );
};

export default UploadedMediaEdit;
