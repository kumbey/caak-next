import { useState } from "react";
import { useRouter } from "next/router";
import Button from "../button";
import Input from "../input";
import Consts from "../../utility/Consts";
import Validate from "../../utility/Validate";
import Gender from "../gender/gender";
import API from "@aws-amplify/api";
import { createUser } from "../../graphql-custom/user/mutation";
import useLocalStorage from "../../hooks/useLocalStorage";
import Auth from "@aws-amplify/auth";

const UserInformation = ({ activeType, nextStep }) => {
    const router = useRouter();
    const { lsGet, lsSet, lsRemove } = useLocalStorage("session");
    let usrData = lsGet(Consts.SS_UserSignUp).usrData;

    console.log(usrData);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const [nickname, setNickname] = useState("");
    const [gender, setGender] = useState("");
    const [age, setAge] = useState("");

    Auth.currentAuthenticatedUser().then((usr) => console.log(usr));

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
            ignoreOn: true,
        },
        age: {
            value: age,
            type: Consts.typeAge,
            onChange: setAge,
            ignoreOn: true,
        },
    };

    const { handleChange, errors, setErrors, handleSubmit, isValid } =
        Validate(validate);

    const doSubmit = async () => {
        try {
            setLoading(true);

            usrData.nickname = nickname;
            usrData.gender = gender;
            usrData.age = age;
            console.log(usrData);
            await saveUserData(usrData).then(() => {
                setLoading(false);
            });

            lsRemove(Consts.SS_UserSignUp);
        } catch (ex) {
            setLoading(false);
            console.log(ex);
        }
    };

    const saveUserData = async (data) => {
        let user = await API.graphql({
            query: createUser,
            variables: { input: data },
            authMode: "AWS_IAM",
        });

        console.log(user);
    };

    const submitHandler = () => {
        handleSubmit(doSubmit);
        if (nextStep) {
            nextStep();
        }
    };

    return (
        <>
            <div
                className={
                    "flex text-caak-generalblack justify-center text-center align-center  pb-c2 mt-9 font-bold text-24px"
                }
            >
                Хувийн мэдээлэл
            </div>
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
                        value={age || ""}
                        name={"age"}
                        errorMessage={errors.age}
                        onChange={handleChange}
                        placeholder={"Нас"}
                        className={
                            "py-3 border border-caak-titaniumwhite h-c9 bg-caak-titaniumwhite"
                        }
                    />

                    <Gender
                        setGender={setGender}
                        gender={gender}
                        label={"Таны хүйс"}
                    />
                </div>
                <div className=" px-c8 ph:px-c2 text-caak-generalblack text-14px flex items-center justify-between mt-5">
                    <Button
                        loading={loading}
                        onClick={() => submitHandler()}
                        className={
                            "rounded-md w-full h-c9 text-17px font-bold bg-caak-secondprimary"
                        }
                    >
                        Үргэлжлүүлэх
                    </Button>
                </div>
            </form>
        </>
    );
};

export default UserInformation;
