import { useEffect, useState } from "react";
import Switch from "./Switch";
import API from "@aws-amplify/api";
import { graphqlOperation } from "@aws-amplify/api-graphql";
import { updateUser } from "../../graphql-custom/user/mutation";
import { useUser } from "../../context/userContext";

export default function SiteConfiguration() {
  const { user } = useUser();
  const [active, setActive] = useState(
    typeof JSON.parse(user.meta).settings.autoPlay === "boolean"
      ? JSON.parse(user.meta).settings.autoPlay
      : true
  );

  const toggle = async (e) => {
    setActive(!active);
    const temp = JSON.parse(user.meta);
    console.log(temp);
    const res1 = {
      ...temp,
      settings: {
        autoPlay: !active,
      },
    };
    const res = JSON.stringify(res1);

    console.log(res1);

    await API.graphql(
      graphqlOperation(updateUser, {
        input: {
          id: user.id,
          meta: res,
        },
      })
    );
  };
  // useEffect(() => {
  //   console.log(JSON.parse(user.meta).settings.autoPlay);
  // }, []);
  useEffect(() => {
    console.log(JSON.parse(user.meta).settings.autoPlay);
    console.log(active);
  }, [active]);

  return (
    <div className="flex flex-col mt-[30px] mb-[70px] mx-[30px]">
      <p className="font-semibold text-caak-aleutian font-inter text-22px mb-[10px]">
        Сайтын тохиргоо
      </p>
      <div
        style={{ paddingBlock: "14px" }}
        className=" flex items-center justify-between w-full border-b"
      >
        <p className="text-15px font-normal">
          Видео бичлэгийг автоматаар тоглуулах
        </p>
        <Switch toggle={toggle} active={active} />
      </div>
    </div>
  );
}
