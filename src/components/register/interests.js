import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Button from "/src/components/button";
import API from "@aws-amplify/api";
import { graphqlOperation } from "@aws-amplify/api-graphql";
import { getCategoryList } from "../../graphql-custom/category/queries";

const items = [
    {
        icon: "icon-fi-rs-ig",
        title: "Спорт",
    },
    {
        icon: "icon-fi-rs-fb",
        title: "Технологи",
    },
    {
        icon: "icon-fi-rs-tiktok",
        title: "Хөгжилтэй",
    },
    {
        icon: "icon-fi-rs-social",
        title: "Хоол",
    },
    {
        icon: "icon-fi-rs-lock-f",
        title: "Аялал",
    },
    {
        icon: "icon-fi-rs-star",
        title: "Түүх",
    },
    {
        icon: "icon-Android",
        title: "Тоглоом",
    },
    {
        icon: "icon-fi-rs-auro",
        title: "Шинжлэх ухаан",
    },
    {
        icon: "icon-fi-rs-image",
        title: "Гоо сайхан",
    },
    {
        icon: "icon-fi-rs-world",
        title: "Урлаг",
    },
    {
        icon: "icon-fi-rs-add",
        title: "Дуу хөгжим",
    },
    {
        icon: "icon-fi-rs-back",
        title: "Авто машин",
    },
];

export default function Interests({ nextStep }) {
    const router = useRouter();

    const [loading, setLoading] = useState(false);
    const [selected, setSelected] = useState([]);
    const [categories, setCategories] = useState([]);

    const selectHandler = (index, title) => {
        if (selected.length === 0) setSelected([...selected, title]);

        if (selected.includes(title)) {
            setSelected(selected.filter((item) => item !== title));
        } else {
            setSelected([...selected, title]);
        }
    };

    const submitHandler = () => {
        router.replace(
            `?signInUp=completed&isModal=true`,
            `/signInUp/completed`
        );
    };

    useEffect(() => {
        API.graphql(graphqlOperation(getCategoryList)).then((cat) => {
            setCategories(cat.data.listCategories.items);
        });
    }, []);

    useEffect(() => {
        console.log(selected);
    }, [selected]);

    return (
        <div className="px-2 sm:px-10 pb-c1">
            <div
                className={
                    "flex text-caak-generalblack justify-center text-center align-center  pb-c2 mt-9 font-bold text-24px"
                }
            >
                Таны сонирхол
            </div>
            <div
                style={{ maxWidth: "360px" }}
                className={
                    "flex text-caak-darkBlue mb-c2 text-15px text-center"
                }
            >
                Та өөрийн дуртай сонирхлуудыг сонгосноор өөрийн хүрээллийг
                хурдан олох боломжтой.
            </div>
            <div className="flex flex-row flex-wrap items-center justify-center gap-3">
                {categories.map((data, index) => {
                    return (
                        <div
                            key={index}
                            onClick={(e) => selectHandler(index, data.name)}
                            className={`
                                            flex items-center border py-px-6 rounded-full justify-center cursor-pointer px-c6 
                                            ${
                                                selected.find(
                                                    (item) => item === data.name
                                                )
                                                    ? "bg-caak-primary text-white"
                                                    : ""
                                            }
                                        `}
                        >
                            {selected.find((item) => item === data.name) ? (
                                <span className="icon-fi-rs-check text-12px mr-1.5" />
                            ) : (
                                <span
                                    className={`mr-1.5 text-18px ${data.icon}`}
                                />
                            )}
                            <p className="text-15px font-medium">{data.name}</p>
                        </div>
                    );
                })}
            </div>

            <p
                className={`${
                    selected.length < 3 ? "opacity-100" : "opacity-0"
                } text-center mt-5 text-caak-primary text-15px`}
            >
                Хамгийн багадаа 3-ыг сонгоно уу!
            </p>
            <div className=" px-c8 ph:px-c2 text-caak-generalblack text-14px flex items-center justify-between mt-5">
                <Button
                    loading={loading}
                    onClick={() => submitHandler()}
                    className={
                        "rounded-md w-full h-c9 text-17px font-bold bg-caak-secondprimary"
                    }
                >
                    Дуусгах
                </Button>
            </div>
        </div>
    );
}
