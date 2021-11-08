import { useHistory } from "react-router";

export default function Admin() {
  const history = useHistory();
  return (
    <div className="h-c23">
      <p className="text-17px text-caak-generalblack font-bold">
        Админ тохиргоо
      </p>
      <div
        onClick={() => history.push({ pathname: "/group/pending" })}
        className="mt-b5 flex items-center cursor-pointer"
      >
        <span className="icon-fi-rs-pending text-16px mr-px-8 bg-caak-titaniumwhite p-px-12 flex rounded rounded-full" />
        <p className="text-15px text-caak-generalblack mr-c6 font-bold">
          Хүлээгдэж буй постууд
        </p>
        <p className="text-13px text-caak-bleudefrance bg-caak-bleudefrance px-px-11 bg-opacity-20 font-bold rounded-lg">
          4
        </p>
      </div>
      {/*<div className="mt-px-12 flex items-center cursor-pointer">
                            <span className="icon-fi-rs-archive text-16px mr-px-8 bg-caak-titaniumwhite p-px-12 flex rounded rounded-full"/>
                            <p className="text-15px text-caak-generalblack font-bold">Архивлагдсан постууд</p>
                        </div>*/}
      <div className="mt-px-12 flex items-center cursor-pointer">
        <span className="icon-fi-rs-stats text-16px mr-px-8 bg-caak-titaniumwhite p-px-12 flex rounded rounded-full" />
        <p className="text-15px text-caak-generalblack font-bold">Статистик</p>
      </div>
      <div
        onClick={() => history.push({ pathname: "/group/information" })}
        className="mt-px-12 flex items-center cursor-pointer"
      >
        <span className="icon-fi-rs-settings-f text-16px mr-px-8 bg-caak-titaniumwhite p-px-12 flex rounded rounded-full" />
        <p className="text-15px text-caak-generalblack font-bold">Тохиргоо</p>
      </div>
    </div>
  );
}
