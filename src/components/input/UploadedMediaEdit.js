import Loader from "../loader";
import { useEffect, useState } from "react";
import {
  arrayMove,
  rectSortingStrategy,
  SortableContext,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import {
  closestCenter,
  DndContext,
  DragOverlay,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import Image from "next/image";
import Switch from "../userProfile/Switch";
import AddPostCardSmall from "../card/AddPostCardSmall";
import { generateFileUrl, getGenderImage } from "../../utility/Util";
import Video from "../video";

const thumbnailImageHandler = (item) => {
  if (item.file) {
    if (item.file.url) {
      return item.file.url;
    } else {
      return generateFileUrl(item.file);
    }
  } else {
    return getGenderImage("default").src;
  }
};

const SortableCard = ({ active, item, onClickClose, setFeaturedPost }) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: item.id });
  const styles = {
    backgroundColor: "transparent",
    borderRadius: "5px",
    marginRight: "7px",
    marginBottom: "7px",
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={styles}
      {...attributes}
      className={`w-[77px] h-[77px] flex justify-center items-center group relative ${
        active ? "border-[2px] border-caak-primary" : ""
      }`}
    >
      <div
        onClick={onClickClose}
        className={
          "transition-all duration-150 group-hover:flex  hidden justify-center items-center rounded-full w-[24px] h-[24px] bg-black bg-opacity-60 absolute top-[4px] right-[4px] z-[1]"
        }
      >
        <span className={"icon-fi-rs-close text-white text-[10px]"} />
      </div>
      <div
        onClick={setFeaturedPost}
        className={
          "transition-all duration-150 group-hover:flex hidden justify-center items-center rounded-full w-[24px] h-[24px] bg-caak-primary bg-opacity-90 absolute top-[4px] left-[4px] z-[1]"
        }
      >
        <span className={"icon-fi-rs-star text-white text-[10px]"} />
      </div>
      <div
        {...listeners}
        className={`flex items-center justify-center group-hover:opacity-100 border-[1px] border-caak-titaniumwhite transition-all duration-300 relative ${
          active
            ? "w-[64px] h-[64px] opacity-100"
            : "opacity-[0.66] w-[77px] h-[77px]"
        }  bg-white rounded-[5px]`}
      >
        {item.loading && (
          <div
            className={
              "flex items-center justify-center w-full h-full bg-white bg-opacity-80 z-[1]"
            }
          >
            <Loader className={"bg-caak-primary"} />
          </div>
        )}

        {item.file?.type?.startsWith("video") ? (
          <Video
            videoClassname={"object-cover rounded-[4px]"}
            hideControls
            smallIndicator
            src={thumbnailImageHandler(item)}
          />
        ) : (
          <Image
            className={"rounded-[5px]"}
            alt={""}
            src={thumbnailImageHandler(item)}
            layout={"fill"}
            objectFit={"cover"}
          />
        )}
      </div>
    </div>
  );
};

function CardsWrapper({ children }) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        maxHeight: "168px",
        overflowY: "scroll",
      }}
    >
      {children}
    </div>
  );
}

const UploadedMediaEdit = ({
  setPost,
  post,
  errors,
  loading,
  add,
  selectedGroup,
}) => {
  const [activeId, setActiveId] = useState(1);
  const [activeIndex, setActiveIndex] = useState(0);
  const [allowComment, setAllowComment] = useState(true);
  const [caakContent, setCaakContent] = useState(false);

  const [draft, setDraft] = useState(false);
  const [boost, setBoost] = useState(false);
  const sensors = useSensors(useSensor(MouseSensor), useSensor(TouchSensor));
  const [sortItems, setSortItems] = useState(post.items);
  const [viewDescription, setViewDescription] = useState(!add);

  const [loaded, setLoaded] = useState(false);
  const maxLengths = {
    title: 200,
    imageDescription: 500,
  };
  const popItem = (index_arg) => {
    const filteredArray = post.items.filter(function (item, index) {
      return index !== index_arg;
    });

    setActiveIndex((prev) => {
      if (prev === post.items.length - 1) {
        return prev - 1;
      }
      return prev;
    });

    setPost({ ...post, items: filteredArray });
  };

  const featuredPostHandler = (index) => {
    const newItems = arrayMove(post.items, index, 0);
    setPost({ ...post, items: newItems });
    setActiveIndex(0);
  };

  const captionHandler = (e) => {
    const arr = [...post.items];
    const currentItem = arr[activeIndex];
    currentItem.title = e.target.value;
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

  useEffect(() => {
    setLoaded(true);
  }, []);

  useEffect(() => {
    setSortItems([...post.items]);
  }, [post]);

  return (
    <div>
      {errors && (
        <div
          className={
            "flex flex-row justify-between bg-caak-red bg-opacity-70 w-full p-3.5 px-6 my-4"
          }
        >
          <span className={"text-15px text-white font-normal"}>
            Зураг болон Видео хуулахад алдаа гарлаа.
          </span>
          <span
            className={
              "cursor-pointer text-14px font-medium text-white underline tracking-wider"
            }
          >
            Дэлгэрэнгүй унших..
          </span>
        </div>
      )}
      <div className={"px-[18px] mt-[12px]"}>
        <div className={"w-full block relative"}>
          <textarea
            onFocus={auto_grow}
            onInput={auto_grow}
            maxLength={maxLengths.title}
            placeholder={"Гарчиг"}
            value={post.title}
            onChange={postTitleHandler}
            className={
              "addPostTextarea overflow-hidden min-h-[44px] text-[15px] pr-[55px] text-caak-extraBlack w-full rounded-[3px] border-[1px] border-caak-titaniumwhite focus:ring-caak-primary"
            }
          />
          <span
            className={
              "absolute top-1/2 -translate-y-1/2 right-[12px] text-[12px] text-caak-darkBlue"
            }
          >
            {post.title?.length || 0}/{maxLengths.title}
          </span>
        </div>
        <div
          className={`w-full block mt-[12px] ${
            !viewDescription ? "hidden" : ""
          }`}
        >
          <textarea
            onFocus={auto_grow}
            onInput={auto_grow}
            placeholder={"Оршил"}
            style={{ resize: "none" }}
            value={post.description}
            onChange={(e) =>
              setPost((prev) => ({ ...prev, description: e.target.value }))
            }
            className={
              "addPostTextarea overflow-y-scroll min-h-[68px] text-[15px] text-caak-extraBlack w-full rounded-[3px] border-[1px] border-caak-titaniumwhite focus:ring-caak-primary"
            }
            rows={2}
          />
        </div>
        <div
          onClick={() => setViewDescription(!viewDescription)}
          className={`flex flex-row items-center ${
            viewDescription ? "text-caak-generalblack" : "text-caak-primary"
          }  justify-end cursor-pointer`}
        >
          <div className={"flex items-center justify-center w-[14px] h-[14px]"}>
            <span
              className={`${
                viewDescription ? "icon-fi-rs-minus-1" : "icon-fi-rs-add-l "
              } text-[9.33px]`}
            />
          </div>
          <p className={"text-[13px]"}>Оршил</p>
        </div>
      </div>

      <div
        className={`relative border-caak-titaniumwhite ${
          post ? "" : "border-dashed"
        } border  rounded-[3px] p-[12px] mb-[32px] mx-[18px] mt-[22px]`}
      >
        {loading && (
          <div
            className={
              "flex items-center justify-center cursor-not-allowed text-center absolute w-full h-screen max-h-full top-0 left-0 z-30 bg-white bg-opacity-90"
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
                    onClickClose={() => popItem(index)}
                    setFeaturedPost={() => featuredPostHandler(index)}
                    active={activeIndex === index}
                    setActiveIndex={setActiveIndex}
                    key={item.id}
                    item={item}
                  />
                );
              })}
              <AddPostCardSmall post={post} setPost={setPost} />
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
        <div className={"flex flex-col sm:flex-row sm:h-[300px] mt-[20px]"}>
          <div
            style={{ flexBasis: `300px` }}
            className={
              "flex-1 w-full h-full relative bg-caak-liquidnitrogen rounded-[3px] border-[1px] border-caak-titaniumwhite"
            }
          >
            {post.items[activeIndex]?.file?.type?.startsWith("video") ? (
              <Video
                durationIndicator={true}
                smallIndicator
                videoClassname={"object-contain rounded-[4px]"}
                src={thumbnailImageHandler(post.items[activeIndex])}
              />
            ) : (
              <Image
                alt={""}
                src={thumbnailImageHandler(post.items[activeIndex])}
                objectFit={"contain"}
                layout={"fill"}
              />
            )}
          </div>
          <div
            style={{ flexBasis: `366px` }}
            className={"w-full h-full sm:ml-[14px] mt-[20px] sm:mt-0 relative"}
          >
            <textarea
              placeholder={"Зурагны тайлбар"}
              style={{ resize: "none" }}
              onChange={captionHandler}
              value={post.items[activeIndex].title}
              maxLength={maxLengths.imageDescription}
              className={
                "addPostTextarea w-full h-[300px] rounded-[3px] border-[1px] pr-[38px] border-caak-titaniumwhite p-[18px] rounded-[3px] focus:ring-caak-primary"
              }
            />
            <span
              className={
                "absolute bottom-[12px] right-[12px] text-[12px] text-caak-darkBlue"
              }
            >
              {post.items[activeIndex]?.title?.length || 0}/
              {maxLengths.imageDescription}
            </span>
          </div>
        </div>
      </div>
      <div
        className={
          "bg-white px-[28px] py-[20px] border-b-[1px] border-t-[1px] border-caak-titaniumwhite"
        }
      >
        <div className={"flex items-center justify-between"}>
          <p className={"text-caak-generalblack text-[16px] font-semibold"}>
            Постын тохиргоо
          </p>
        </div>
        <div className={"w-[265px]"}>
          {selectedGroup &&
            (selectedGroup.role_on_group === "ADMIN" ||
              selectedGroup.role_on_group === "MODERATOR") && (
              <div className={"flex flex-row justify-between mt-[16px]"}>
                <p className={"text-[15px] text-caak-generalblack"}>
                  Саак контент
                </p>
                <Switch toggle={setCaakContent} active={caakContent} />
              </div>
            )}
          <div className={"flex flex-row justify-between mt-[16px]"}>
            <p className={"text-[15px] text-caak-generalblack"}>
              Сэтгэгдэл зөвшөөрөх
            </p>
            <Switch toggle={setAllowComment} active={allowComment} />
          </div>
          <div className={"flex flex-row justify-between mt-[16px]"}>
            <p className={"text-[15px] text-caak-generalblack"}>Ноорог</p>
            <Switch toggle={setDraft} active={draft} />
          </div>
          <div className={"flex flex-row justify-between mt-[16px]"}>
            <p className={"text-[15px] text-caak-generalblack"}>Онцлох</p>
            <Switch toggle={setBoost} active={boost} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadedMediaEdit;
