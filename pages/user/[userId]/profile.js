import React, { useCallback, useEffect, useState } from "react";
import {
  createFollowedUsers,
  deleteFollowedUsers,
} from "/src/graphql-custom/user/mutation";
import API from "@aws-amplify/api";
import Button from "/src/components/button";
import Loader from "/src/components/loader";
import Link from "next/link";
import { ApiFileUpload, getUserById } from "/src/utility/ApiHelper";
import { graphqlOperation } from "@aws-amplify/api-graphql";
import Dummy from "dummyjs";
import { useDropzone } from "react-dropzone";
import awsExports from "/src/aws-exports";
import { getFileExt, getFileName, getFileUrl } from "/src/utility/Util";
import { updateUser } from "/src/graphql-custom/user/mutation";
import { deleteFile } from "/src/graphql-custom/file/mutation";
import { useUser } from "/src/context/userContext";
import { useRouter } from "next/router";
import UserPosts from "./UserPosts";

export default function Profile() {
  const router = useRouter();
  const userId = router.query.userId;

  const [user, setUser] = useState();
  const { isLogged } = useUser();

  const { user: signedUser } = useUser();
  const [uploading, setUploading] = useState(false);
  const [doRender, setDoRender] = useState(0);
  const [loading, setLoading] = useState(false);
  const [activeIndex, setActiveIndex] = useState(1);

  const onDrop = useCallback((file) => {
    setProfilePictureDropZone({
      ext: getFileExt(file[0].name),
      name: getFileName(file[0].name),
      key: file[0].name,
      type: file[0].type,
      url: URL.createObjectURL(file[0]),
      bucket: awsExports.aws_user_files_s3_bucket,
      region: awsExports.aws_user_files_s3_bucket_region,
      level: "public",
      obj: file[0],
    });
  }, []);
  const [profilePictureDropZone, setProfilePictureDropZone] = useState([]);
  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: "image/*",
    noKeyboard: true,
    noClick: false,
    multiple: false,
  });

  const createFollowUser = async () => {
    await API.graphql({
      query: createFollowedUsers,
      variables: {
        input: { followed_user_id: signedUser.id, user_id: userId },
      },
    });
    user.totals.followers += 1;
    user.followed = true;
    setDoRender(doRender + 1);
  };

  const deleteFollowUser = async () => {
    await API.graphql({
      query: deleteFollowedUsers,
      variables: {
        input: {
          followed_user_id: signedUser.id,
          user_id: userId,
        },
      },
    });
    user.totals.followers -= 1;
    user.followed = false;
    setDoRender(doRender + 1);
  };

  const handleClick = () => {
    if (isLogged) {
      if (!user.followed) {
        createFollowUser();
      } else if (user.followed) {
        deleteFollowUser();
      }
    } else {
      history.push({
        pathname: `/login`,
        state: { background: location },
      });
    }
  };

  useEffect(() => {
    const updateProfileImage = async () => {
      try {
        setUploading(true);
        const resp = await ApiFileUpload(profilePictureDropZone);

        await API.graphql(
          graphqlOperation(updateUser, {
            input: {
              id: user.id,
              pic_id: resp.id,
            },
          })
        );
        if (user.pic_id)
          await API.graphql(
            graphqlOperation(deleteFile, {
              input: {
                id: user.pic_id,
              },
            })
          );
        user.pic = resp;
        setProfilePictureDropZone({});
        setUploading(false);
      } catch (ex) {
        setUploading(false);
        console.log(ex);
      }
    };
    if (profilePictureDropZone.name) updateProfileImage();
    // eslint-disable-next-line
  }, [profilePictureDropZone]);
  //FORCE RENDER STATE

  useEffect(() => {
    setLoading(true);
    try {
      if (isLogged) {
        getUserById({
          id: userId,
          setUser,
          authMode: "AMAZON_COGNITO_USER_POOLS",
        }).then(() => setLoading(false));
      } else {
        getUserById({
          id: userId,
          setUser,
          authMode: "AWS_IAM",
        }).then(() => setLoading(false));
      }
    } catch (ex) {
      console.log(ex);
    }
  }, [signedUser, userId]);

  return !loading && user ? (
    <div>
      <div className="ph:block flex">
        <span />
        <p />
        <div>
          <span />
          <span />
        </div>
      </div>
      <div
        style={{ height: "230px" }}
        className="ph:h-c22 flex items-center justify-center bg-white border-t"
      >
        <div className="md:flex md:justify-around grid justify-center w-full">
          <div className="ph:text-center">
            <div className="ph:grid flex">
              <div className="grid sm:flex relative items-center justify-center">
                <img
                  style={{ height: "120px", width: "120px" }}
                  alt={user.nickname}
                  src={user.pic ? getFileUrl(user.pic) : Dummy.img("200x200")}
                  className="ph:w-c31 ph:h-c31 rounded-full cursor-pointer object-cover"
                />
                {uploading && (
                  <Loader
                    containerClassName={"absolute"}
                    className={"bg-caak-primary"}
                  />
                )}
                {signedUser?.id === userId && (
                  <>
                    <div
                      {...getRootProps()}
                      className={`flex justify-center items-center cursor-pointer transition ease-linear duration-200 absolute rounded-full opacity-0 hover:opacity-100  w-full h-full  left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2`}
                    >
                      {!uploading && (
                        <>
                          <span className={"icon-fi-rs-thick-add"} />
                          <input {...getInputProps()} />
                        </>
                      )}
                    </div>
                  </>
                )}
              </div>
              <div className="ph:grid ph:justify-center ph:mt-3 sm:ml-c6">
                <p
                  style={{ marginBlockStart: "13px" }}
                  className="text-26px ph:hidden font-bold"
                >
                  {user.firstname}
                </p>
                <p className="text-18px text-caak-generalblack ph:justify-center flex items-center font-normal">
                  @{user.nickname}
                  <span
                    style={{ marginInlineStart: "4px" }}
                    className="icon-fi-rs-verified text-13px text-caak-buttonblue"
                  />
                </p>
                <div className="mt-b4 flex">
                  <span className="flex items-center">
                    <p className="text-18px text-caak-generalblack font-medium">
                      {user.aura || "0"}
                    </p>{" "}
                    <p
                      style={{ marginInlineStart: "4px" }}
                      className="text-15px text-caak-darkBlue"
                    >
                      Аура
                    </p>
                  </span>
                  <span className="mx-c11 ph:mx-px-8 flex items-center">
                    <p className="text-18px text-caak-generalblack font-medium">
                      {user.totals.followers}
                    </p>{" "}
                    <p
                      style={{ marginInlineStart: "4px" }}
                      className="text-15px text-caak-darkBlue"
                    >
                      дагагчид
                    </p>
                  </span>
                  <span className="flex items-center">
                    <p className="text-18px text-caak-generalblack font-medium">
                      {user.totals.confirmed}
                    </p>{" "}
                    <p
                      style={{ marginInlineStart: "4px" }}
                      className="text-15px text-caak-darkBlue"
                    >
                      пост
                    </p>
                  </span>
                </div>
              </div>
            </div>
            <p className="text-15px text-caak-generalblack mt-px-8 sm:mt-c11">
              {user.about}
            </p>
          </div>
          <div>
            <div className=" md:justify-center flex justify-end">
              {isLogged && userId === signedUser.id ? (
                <Link href={`/user/${user.id}/Settings`}>
                  <a>
                    <div className="h-c13 px-c1 flex items-center rounded-lg shadow cursor-pointer">
                      <span className="pr-px-6 icon-fi-rs-settings text-18px" />
                      <p className="text-15px font-medium">Тохиргоо</p>
                    </div>
                  </a>
                </Link>
              ) : (
                <Button
                  className="h-c13 w-28"
                  icon={<span className="icon-fi-rs-add-friend mr-1" />}
                  iconPosition="left"
                  onClick={handleClick}
                  skin={`${
                    user.followed ? "secondary" : "bg-caak-generalblack"
                  }`}
                >
                  {user.followed ? "Дагасан" : "Дагах"}
                </Button>
              )}
              <span
                style={{ width: "49px", marginInlineStart: "10px" }}
                className="h-c13 text-4px icon-fi-rs-dots text-caak-generalblack flex items-center justify-center rounded-lg shadow cursor-pointer"
              />
            </div>
            <div className="md:mt-10 flex justify-center py-4">
              <span
                style={{ marginInlineEnd: "14px" }}
                className="icon-fi-rs-ig text-caak-blue cursor-pointer"
              />
              <span
                style={{ marginInlineEnd: "14px" }}
                className="icon-fi-rs-fb text-caak-blue cursor-pointer"
              />
              <span
                style={{ marginInlineEnd: "14px" }}
                className="icon-fi-rs-tiktok text-caak-blue cursor-pointer"
              />
              <span className="icon-fi-rs-tw text-caak-blue cursor-pointer" />
            </div>
          </div>
        </div>
      </div>

      <div className="mt-c2 flex items-center justify-around w-full">
        <div className="md:flex-row flex flex-col">
          <Button
            key={1}
            onClick={() => setActiveIndex(1)}
            className={`text-15px h-c32 mb-4 md:mb-0 text-caak-primary mr-px-6 hover:bg-caak-titaniumwhite flex items-center justify-center font-bold  rounded-lg 
                                    ${
                                      1 === activeIndex
                                        ? "bg-white shadow"
                                        : "bg-transparent text-caak-generalblack"
                                    }`}
          >
            <span className="icon-fi-rs-drag text-20px mr-px-6" />

            <p className="text-17px ml-px-10 font-medium">
              {isLogged && userId === signedUser.id
                ? "Миний постууд"
                : "Хэрэглэгчийн постууд"}
            </p>
          </Button>
          {isLogged && userId === signedUser.id ? (
            <>
              <Button
                key={2}
                onClick={() => setActiveIndex(2)}
                className={`text-15px h-c32 mb-4 md:mb-0 text-caak-primary mr-px-6 hover:bg-caak-titaniumwhite flex items-center justify-center font-bold  rounded-lg 
                                    ${
                                      2 === activeIndex
                                        ? "bg-white shadow"
                                        : "bg-transparent text-caak-generalblack"
                                    }`}
              >
                <span className="icon-fi-rs-pending text-22px" />
                <p className="text-17px ml-px-10 font-medium">
                  Хүлээгдэж буй постууд
                </p>
              </Button>
              <Button
                key={3}
                onClick={() => setActiveIndex(3)}
                className={`text-15px h-c32 text-caak-primary mr-px-6 hover:bg-caak-titaniumwhite flex items-center justify-center font-bold  rounded-lg 
                                    ${
                                      3 === activeIndex
                                        ? "bg-white shadow"
                                        : "bg-transparent text-caak-generalblack"
                                    }`}
              >
                <span className="icon-fi-rs-shield-exclamation text-20px mr-px-6" />
                <p className="text-17px ml-px-10 font-medium">
                  Архивлагдсан постууд
                </p>
              </Button>
            </>
          ) : null}
        </div>
        <select className="md:block text-15px w-c132 text-caak-generalblack hidden font-semibold bg-transparent border-0 cursor-pointer">
          <option>Илүү ихийг</option>
          {/* <option>Илүү ихийг</option>
          <option>Илүү ихийг</option> */}
        </select>
      </div>
      <div className="flex flex-col items-center justify-center">
        {/* post */}
        <div className="grid_container_container flex flex-col justify-center w-full">
          {/* contents */}
          <div className={`${activeIndex === 1 ? "" : "hidden"}`}>
            <UserPosts userId={userId} type="CONFIRMED" card />
          </div>
          <div
            className={`flex mt-b5  justify-center ${
              activeIndex === 2 ? "" : "hidden"
            }`}
          >
            <UserPosts userId={userId} type="PENDING" />
          </div>
          <div
            className={`flex mt-b5  justify-center ${
              activeIndex === 3 ? "" : "hidden"
            }`}
          >
            <UserPosts userId={userId} type="ARCHIVED" />
          </div>
        </div>
      </div>
    </div>
  ) : null;
}
