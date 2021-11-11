import Image from "next/image";
import successImg from "/public/assets/images/Successfully.svg";

const Completed = () => {
  return (
    <div className="flex flex-col items-center">
      <Image width={182} height={144} src={successImg} alt={"success"} />
      <div
        className={
          "text-center text-caak-generalblack mt-2 mb-4 font-bold text-24px  "
        }
      >
        Шинэ саак-т тавтай <br /> морилно уу!
      </div>
      <p className="text-center mb-10 text-caak-darkBlue">
        Таны сонирхлын дагуу танд зориулан <br /> фостуудыг бэлтэж байна.
      </p>
    </div>
  );
};

export default Completed;
