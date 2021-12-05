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
import Switch from "../../../pages/user/[userId]/Switch";
import AddPostCardSmall from "../card/AddPostCardSmall";
import useMediaQuery from "../navigation/useMeduaQuery";

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
        <Image
          className={"rounded-[5px]"}
          alt={""}
          src={item.file.url}
          layout={"fill"}
          objectFit={"cover"}
        />
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
        overflowY: "overlay",
      }}
    >
      {children}
    </div>
  );
}

const UploadedMediaEdit = ({ setPost, post, errors, loading, uploadPost }) => {
  const [activeId, setActiveId] = useState(1);
  const [activeIndex, setActiveIndex] = useState(0);
  const [allowComment, setAllowComment] = useState(true);
  const [draft, setDraft] = useState(false);
  const [boost, setBoost] = useState(false);
  const sensors = useSensors(useSensor(MouseSensor), useSensor(TouchSensor));

  const isTablet = useMediaQuery("screen and (max-device-width: 767px)");
  const isMobile = useMediaQuery("screen and (max-device-width: 600px)");
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
    setPost({ items: newItems });
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
    setActiveId(parseInt(event.active.id));
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
    setPost({ items: newItems });
    setActiveIndex(event.active.data.current.sortable.index);
  };

  function auto_grow(element) {
    element.target.style.height = "5px";
    element.target.style.height = element.target.scrollHeight + "px";
  }

  useEffect(() => {
    setLoaded(true);
  }, []);

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
            onInput={auto_grow}
            maxLength={maxLengths.title}
            placeholder={"Гарчиг"}
            style={{ resize: "none" }}
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
        <div className={"w-full block mt-[12px]"}>
          <textarea
            onInput={auto_grow}
            placeholder={"Оршил"}
            style={{ resize: "none" }}
            value={post.description}
            onChange={(e) =>
              setPost((prev) => ({ ...prev, description: e.target.value }))
            }
            className={
              "addPostTextarea overflow-hidden min-h-[68px] text-[15px] text-caak-extraBlack w-full rounded-[3px] border-[1px] border-caak-titaniumwhite focus:ring-caak-primary"
            }
            rows={2}
          />
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
          <SortableContext items={post.items} strategy={rectSortingStrategy}>
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
            style={{flexBasis: `300px`}}
            className={
              "w-full h-full relative bg-caak-liquidnitrogen rounded-[3px] border-[1px] border-caak-titaniumwhite"
            }
          >
            <Image
              alt={""}
              src={post.items[activeIndex].file.url}
              objectFit={"contain"}
              layout={"fill"}
            />
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
          "bg-white px-[28px] py-[20px] h-[181px] border-b-[1px] border-t-[1px] border-caak-titaniumwhite"
        }
      >
        <div className={"flex items-center justify-between"}>
          <p className={"text-caak-generalblack text-[16px] font-semibold"}>
            Постын тохиргоо
          </p>
        </div>
        <div className={"w-[265px]"}>
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
