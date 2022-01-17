import { useState, useEffect } from "react";
import Cover from "../../public/assets/images/defaultCover.png";
import Button from "../../src/components/button";
import MyDropZone from "../../src/components/input/MyDropZone";
import { getFileUrl, getReturnData } from "../../src/utility/Util";
import { API, graphqlOperation } from "aws-amplify";
import { listCategorys, getCategory } from "../../src/graphql/queries";
import { ApiFileUpload } from "../../src/utility/ApiHelper";
import { useUser } from "../../src/context/userContext";
import { createGroup } from "../../src/graphql-custom/group/mutation";
import { createGroupUsers } from "../../src/graphql-custom/GroupUsers/mutation";
import { useRouter } from "next/router";
import Head from "next/head";
import Consts from "../../src/utility/Consts";
import AuraModal from "../../src/components/modals/auraModal";

const button = [
  {
      id: 1,
      title: 'Трэнд',
      icon: "icon-fi-rs-trend-f"
  },
  {
      id: 2,
      title: 'Шинэ',
      icon: "icon-fi-rs-new-o"
  },
  {
      id: 3,
      title: 'Шилдэг',
      icon: "icon-fi-rs-flash-o"
  }
]

export default function CreateGroup() {
  const initData = {
    name: "",
    about: "",
    category: {
      id: "",
    },
    profile: null,
    cover: null,
    followed: true,
    role_on_group: "ADMIN",
    featured: "false",
  };
  const [data, setData] = useState(initData);
  const [loading, setLoading] = useState();
  const [categories, setCategories] = useState([]);
  const [oneCategory, setOneCategory] = useState();
  const [error, setError] = useState(false);
  const [selected, setSelected] = useState(1)
  const [isAuraModalOpen, setIsAuraModalOpen] = useState(false)

  const { user } = useUser();
  const router = useRouter();

  const dateObj = new Date();
  const month = dateObj.getUTCMonth() + 1;
  const day = dateObj.getUTCDate();
  const year = dateObj.getUTCFullYear();

  const newdate = year + "." + month + "." + day;

  const handleChangeName = (e) => {
    const { value } = e.target;
    setData({ ...data, name: value });
  };

  const handleChangeAbout = (e) => {
    const { value } = e.target;
    // value = JSON.stringify(value);
    setData({ ...data, about: value });
  };

  const handleCategoryChange = (e) => {
    const { value } = e.target;
    const category = { ...data.category };
    category.id = value;
    setData({ ...data, category: category });
  };

  const setFile = (key, file) => {
    setData({ ...data, [key]: file });
  };

  const updateGroupData = async (e) => {
    const uploadFile = async (image) => {
      return await ApiFileUpload(image);
    };

    setLoading(true);
    try {
      const coverImage =
        data.cover && !data.cover.id
          ? await uploadFile(data.cover)
          : data.cover;
      const profileImage =
        data.profile && !data.profile.id
          ? await uploadFile(data.profile)
          : data.profile;
      setData({ ...data, cover: coverImage, profile: profileImage });
      let resp = await API.graphql(
        graphqlOperation(createGroup, {
          input: {
            name: data.name,
            category_id: data.category.id,
            featured: data.featured,
            founder_id: user?.id,
            followed: data.followed,
            role_on_group: data.role_on_group,
            about: data.about,
            groupCoverId: coverImage?.id,
            groupProfileId: profileImage?.id,
          },
        })
      );
      resp = getReturnData(resp);
      await API.graphql(
        graphqlOperation(createGroupUsers, {
          input: {
            group_id: resp.id,
            id: `${resp.id}#${user.id}`,
            role: "ADMIN",
            user_id: user.id,
          },
        })
      );
      setLoading(false);
      router.push({
        pathname: `/group/${resp.id}`,
      });
    } catch (ex) {
      setError(true);
      setTimeout(() => {
        setError(false);
      }, 5000);
      console.log(ex);
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const resp = await API.graphql({
          query: listCategorys,
          authMode: "AWS_IAM",
        });
        setCategories(resp.data.listCategorys.items);
        setLoading(false);
      } catch (ex) {
        console.log(ex);
      }
    };
    fetchCategory();
  }, []);

  useEffect(() => {
    const fetchOneCategory = async () => {
      try {
        const resp = await API.graphql({
          query: getCategory,
          variables: {
            id: data.category.id,
          },
          authMode: "AWS_IAM",
        });
        setOneCategory(resp.data.getCategory);
      } catch (ex) {
        console.log(ex);
      }
    };
    fetchOneCategory();
  }, [data.category]);

  return (
    <>
      <Head>
        <title>Шинэ групп үүсгэх - {Consts.siteMainTitle}</title>
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no, viewport-fit=cover"
          />
      </Head>
      <AuraModal setIsOpen={setIsAuraModalOpen} isOpen={isAuraModalOpen} />
      <div className="flex justify-center h-full">
        <div className="flex w-full h-full max-w-[500px] sm:max-w-full flex-col sm:flex-row pt-[54px]">
          <div style={{
            minHeight: "calc(100vh - 54px)"
          }} className="w-full xl:max-w-[440px] bg-white px-[10px] xl:px-[30px]">
            <div>
              <div className="mt-[20px] flex flex-row items-center">
                <span onClick={() => router.back()} className="w-[30px] h-[30px] xl:w-[48px] cursor-pointer xl:h-[48px] bg-[#0000001A] rounded-full flex items-center justify-center align-center text-center icon-fi-rs-back text-[18px]" />
                <p className="text-[15px] font-medium text-[#21293C] ml-[6px]">
                  Өмнөх хуудас руу буцах
                </p>
              </div>
              <input
                required
                maxLength={70}
                type="text"
                value={data.name}
                onChange={handleChangeName}
                placeholder="Группийн нэр"
                className="border w-full h-[48px] rounded-[8px] border-[#E4E4E5] px-[10px] mt-[14px]"
              />
              <textarea
                value={data.about}
                onChange={handleChangeAbout}
                placeholder="Тайлбар"
                className="border w-full h-[100px] rounded-[8px] border-[#E4E4E5] px-[10px] mt-[14px] text-[15px]"
              />
              <MyDropZone
                title={"Нүүр зураг"}
                keyName={"profile"}
                file={data.profile}
                setFile={setFile}
                className={"mt-[14px]"}
              />
              <MyDropZone
                title={"Дэвсгэр зураг"}
                keyName={"cover"}
                file={data.cover}
                setFile={setFile}
                className={"mt-[14px]"}
              />
              <select
                value={data.category.id}
                onChange={handleCategoryChange}
                aria-label="Групп төрөл"
                className="w-full border-[#E4E4E5] rounded-[8px] mt-[14px] h-[48px] text-[#6C7392] text-[16px]"
              >
                <option>Групп төрөл</option>
                {categories.map((cat) => {
                  return (
                    <option value={cat.id} key={cat.id}>
                      {cat.name}
                    </option>
                  );
                })}
              </select>
              <Button
                loading={loading}
                onClick={() => {
                  user.aura < 5000 ? setIsAuraModalOpen(true) : updateGroupData();
                }}
                skin="primary"
                className="w-full my-[14px] h-[48px]"
              >
                Үүсгэх
              </Button>
              {error ? (
                <p className="text-[#FF0000] font-semibold">Алдаа гарлаа</p>
              ) : null}
            </div>
          </div>
          <div className="max-w-[1220px] h-full mx-auto bg-white rounded-[8px] border w-full mt-[40px] p-[30px] relative">
            <div className="w-full relative border">
              <img
                alt=""
                src={getFileUrl(data.cover) ? getFileUrl(data.cover) : Cover.src}
                className="w-full h-full max-h-[100px] xl:max-h-[196px] object-cover"
              />
              <div className="absolute top-[20px] lg:top-[60px] 2xl:top-[128px] left-[10px] xl:left-[80px] w-[80px] xl:w-[148px] h-[80px] xl:h-[148px] rounded-[34px] border-[6px] border-white bg-[#ECEDF1] flex justify-center items-center">
                {getFileUrl(data.profile) ? (
                  <img
                    alt=""
                    className="w-full h-full rounded-[34px] object-cover"
                    src={getFileUrl(data.profile)}
                  />
                ) : (
                  <span className="icon-fi-rs-group-f text-[45px] text-[#9A9FB4]" />
                )}
              </div>
              <div className="pl-[60px] sm:pl-[140px] xl:pl-[248px] xl:pr-[162px] h-[110px] w-fill flex  flex-col md:flex-row xl:justify-between items-center">
                <div>
                  <p className="text-[15px] md:text-[25px] font-semibold break-word">
                    {data.name ? data.name : "Группын нэр"}
                  </p>
                  <div className="flex flex-row items-center">
                    <div className="flex flex-row items-center">
                      <span className="icon-fi-rs-aura-o" />
                      <p className="text-[14px] ml-[2px]">Аура</p>
                    </div>
                    <div className="flex flex-row items-center ml-[15px]">
                      <span className="icon-fi-rs-group-o" />
                      <p className="text-[14px] ml-[2px]">гишүүн</p>
                    </div>
                  </div>
                </div>
                <div className="flex flex-row items-center">
                  <Button
                    iconPosition={"left"}
                    icon={
                      <div
                        className={
                          "w-[20px] h-[20px] flex items-center justify-center "
                        }
                      >
                        <span className={`icon-fi-rs-add-group-f text-[16px] `} />
                      </div>
                    }
                    skin={"primary"}
                    className={`bg-[#9A9FB4] text-white h-[36px] w-full sm:w-[120px] rounded-[6px] font-medium text-[15px] tracking-[0.18px] leading-[15px] py-[4px] pr-[12px] pl-[6px]`}
                  >
                    Нэгдэх
                  </Button>
                </div>
              </div>
            </div>
            <div className={"w-full bg-[#F3F3F4] h-full"}>
              <div className="w-full max-w-[961px] mx-auto flex flex-col xl:flex-row items-center xl:items-start pt-[22px] pb-[35px]">
                <div className="mx-[25px] max-w-[616px] w-full px-[10px] sm:px-0">
                  <div className="w-full h-[60px] px-[16px] py-[12px] bg-white rounded-[8px] flex flex-row items-center justify-evenly">
                    <div className="bg-[#F3F3F4] w-[36px] h-[36px] flex-shrink-0 rounded-full flex items-center justify-center">
                      <span className="icon-fi-rs-profile text-[22px] text-[#AFAFAF]" />
                    </div>
                    <div className="bg-[#F3F3F4] max-w-[498px] mx-[10px] w-full h-[36px] rounded-[6px] flex items-center">
                      <p className="text-[#6C7392] text-[14px] ml-[16px]">
                        Пост оруулах
                      </p>
                    </div>
                    <span className="icon-fi-rs-image-o text-[#9A9FB4] text-[20px]" />
                  </div>
                  <div className='flex flex-row items-center justify-between mt-[32px]'>
                              <div className='flex flex-row items-center'>
                                  {
                                      button.map(({title, icon, id}) => {
                                          return(
                                              <div key={id} onClick={() => setSelected(id)} className={`w-[110px] h-[36px] cursor-pointer justify-center ${selected === id ? 'bg-white' : null} rounded-[8px] flex flex-row justify-center items-center text-[#9A9FB4]`}>
                                                  <span className={icon}/>
                                                  <p className='text-[15px] ml-[4px] font-medium'>{title}</p>
                                              </div>
                                          )
                                      })
                                  }
                              </div>
                              <div className='w-[80px] bg-white flex flex-row items-center justify-evenly text-[#9A9FB4] h-[36px] rounded-[5px] text-[16px]'>
                                  <span className='icon-fi-rs-list-card-f'/>
                                  <span className='icon-fi-rs-list-grid-o'/>
                              </div>
                          </div>
                </div>
                <div className="w-full lg:max-w-[320px] lg:mr-[25px] mt-[22px] xl:mt-0 mr-0 min-w-[320px] h-full bg-white mt-[20px] rounded-[8px] relative">
                  <img
                    alt=""
                    src={
                      getFileUrl(data.cover) ? getFileUrl(data.cover) : Cover.src
                    }
                    className="w-full h-[34px] rounded-t-[8px] object-cover"
                  />
                  <div className="absolute top-[25px] left-[18px] w-[48px] h-[48px] bg-[#ECEDF1] border-[3px] border-white rounded-[6px] flex justify-center items-center">
                    {getFileUrl(data.profile) ? (
                      <img
                        alt=""
                        className="w-full h-full rounded-[6px] object-cover"
                        src={getFileUrl(data.profile)}
                      />
                    ) : (
                      <span className="icon-fi-rs-group-f text-[26px] text-[#9A9FB4]" />
                    )}
                  </div>
                  <p className="ml-[77px] mt-[13px] text-[15px] font-semibold break-word">
                    {data.name ? data.name : "Групп нэр"}
                  </p>
                  <div className="mt-[16px] px-[18px] pb-[18px]">
                    <p className="text-[15px] h-[18px]">
                      {data.about ? data.about : "Тайлбар"}
                    </p>
                    <div className="flex flex-row mt-[22px]">
                      <div>
                        <p className="h-[16px] text-[17px] tracking-[0.26px] leading-[20px] font-medium">
                          0
                        </p>
                        <p className="text-[#6C7392] text-[14px] tracking-[0.21px] leading-[16px] mt-[4px]">
                          Аура
                        </p>
                      </div>
                      <div className="ml-[52px]">
                        <p className="h-[16px] text-[17px] tracking-[0.26px] leading-[20px] font-medium">
                          0
                        </p>
                        <p className="text-[#6C7392] text-[14px] tracking-[0.21px] leading-[16px] mt-[4px]">
                          Гишүүн
                        </p>
                      </div>
                    </div>
                    <div className="border-b border-t py-[20px] flex flex-col justify-center mt-[16px]">
                      <div className="flex flex-row items-center">
                        <span className="icon-fi-rs-birth text-[17.88px] text-[#6C7392]" />
                        <p className="text-[#6C7392] text-[14px] ml-[8px]">
                          {newdate}
                        </p>
                      </div>
                      <div className="flex flex-row items-center mt-[10px]">
                        <span className="icon-fi-rs-globe text-[18.33px] text-[#6C7392]" />
                        <p className="text-[#6C7392] text-[14px] ml-[8px]">
                          Нээлттэй групп
                        </p>
                      </div>
                    </div>
                    <p className="text-[#6C7392] text-[14px] mt-[16px]">
                      Группын төрөл
                    </p>
                    {oneCategory ? (
                      <p className="rounded-full mt-[10px] border h-[37px] max-w-[180px] flex justify-center items-center">
                        {oneCategory.icon}
                        {oneCategory.name}
                      </p>
                    ) : null}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
