import Switch from "./Switch";

export default function SiteConfiguration() {
  return (
    <>
      <p
        className="font-medium"
        style={{
          marginLeft: "30px",
          marginTop: "30px",
          fontSize: "24px",
        }}
      >
        Сайтын тохиргоо
      </p>
      <div style={{ marginTop: "21px" }} className=" border-b">
        <div
          style={{ paddingBlock: "14px" }}
          className="px-c3 flex items-center justify-between w-full border-b"
        >
          <p className="text-16px font-medium">
            Видео бичлэгийг автоматаар тоглуулах
          </p>
          <Switch />
        </div>
      </div>
    </>
  );
}
