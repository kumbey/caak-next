export default function Description({ about }) {
  return (
    <div>
      <p className="text-17px text-caak-generalblack font-bold">
        Бүлгийн тухай
      </p>
      <p className="text-15px text-caak-generalblack mt-px-10">{about}</p>
      <p
        onClick={() => alert("checking")}
        className="text-15px text-caak-primary mt-c6 cursor-pointer"
      >
        Дэлгэрэнгүй танилцах
      </p>
    </div>
  );
}
