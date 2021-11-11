import { useState } from "react";
import { useRouter } from "next/router";
import Button from "../button";
import Input from "../input";
import Consts from "../../utility/Consts";
import Validate from "../../utility/Validate";
import Gender from "../gender/gender";

const UserInformation = ({ activeType }) => {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [nickname, setNickname] = useState("");
  const [gender, setGender] = useState("");
  const [birthdate, setBirthdate] = useState("");

  const validate = {
    nickname: {
      value: nickname,
      type: Consts.typeRequired,
      onChange: setNickname,
      ignoreOn: true,
    },
    gender: {
      value: gender,
      type: Consts.typeRequired,
      onChange: setGender,
    },
    birthdate: {
      value: birthdate,
      type: Consts.typeDate,
      onChange: setBirthdate,
    },
  };

  const { handleChange, errors, setErrors, handleSubmit, isValid } =
    Validate(validate);

  //   useEffect(() => {
  //     if (state.onlyInfo) {
  //       if (user) {
  //         setLastname(user.attributes.middle_name);
  //         setFirstname(user.attributes.name);
  //         setNickname(user.attributes.middle_name + user.attributes.name);
  //       }
  //     }
  //     // eslint-disable-next-line
  //   }, []);

  return (
    <>
      <form onSubmit={(e) => e.preventDefault()}>
        <div className="px-c13 xs:px-2">
          <Input
            label={"Профайл нэр"}
            value={nickname || ""}
            name={"nickname"}
            errorMessage={errors.nickname}
            onChange={handleChange}
            placeholder={"Профайл нэр"}
            className={
              "py-3 border border-caak-titaniumwhite h-c9 bg-caak-titaniumwhite"
            }
          />
          <Input
            label={"Таны нас"}
            value={birthdate || ""}
            name={"birthdate"}
            errorMessage={errors.birthdate}
            onChange={handleChange}
            placeholder={"Нас"}
            className={
              "py-3 border border-caak-titaniumwhite h-c9 bg-caak-titaniumwhite"
            }
          />

          {/* <Select
            value={gender}
            name={"gender"}
            onChange={(e) => setGender(e.target.value)}
            errorMessage={errors.gender}
            containerStyle={"flex-1 w-full mr-2"}
            className="border-caak-titaniumwhite h-c9 bg-caak-titaniumwhite py-3 mb-1 border"
          >
            <option value="placeholder">{"Хүйс"}</option>
            <option value="MALE">Эрэгтэй</option>
            <option value="FEMALE">Эмэгтэй</option>
          </Select> */}

          <Gender setGender={setGender} gender={gender} label={"Таны хүйс"} />
        </div>
      </form>
    </>
  );
};

export default UserInformation;
