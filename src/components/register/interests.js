import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Button from "/src/components/button";
import API from "@aws-amplify/api";
import { graphqlOperation } from "@aws-amplify/api-graphql";
import { getCategoryList } from "../../graphql-custom/category/queries";
import { createUserCategory } from "../../graphql-custom/category/mutation";
import Auth from "@aws-amplify/auth";
import useUser from "../../context/userContext"

export default function Interests() {
    const router = useRouter();
    const { cognitoUser } = useUser()

    const [loading, setLoading] = useState(false);
    const [selected, setSelected] = useState([]);
    const [categories, setCategories] = useState([]);

    const selectHandler = (id) => {

        const userId = cognitoUser.attributes.sub

        if (selected.length === 0)
            setSelected([...selected, { user_id: userId, category_id: id }]);

        if (selected.includes(id)) {
            setSelected(selected.filter((item) => item.category_id !== id));
        } else {
            setSelected([...selected, { user_id: userId, category_id: id }]);
        }
    };

    const submitHandler = async () => {
        try {
            setLoading(true)
            for(let i=0; i < selected.length; i++){
                await API.graphql(
                    graphqlOperation(createUserCategory, { input: selected[i] })
                );
            }
            setLoading(false)

            router.replace(
                `?signInUp=completed&isModal=true`,
                `/signInUp/completed`
            );

        } catch (ex) {
            setLoading(false)
            console.log(ex);
        }
    };

    const fetchCat = async () => {
        await API.graphql(graphqlOperation(getCategoryList)).then((cat) => {
            setCategories(cat.data.listCategories.items);
        });
    };

    useEffect(() => {
        fetchCat();
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
                            onClick={(e) => selectHandler(data.id)}
                            className={`
                                            flex items-center border py-px-6 rounded-full justify-center cursor-pointer px-c6 
                                            ${
                                                selected.find(
                                                    (item) => item === data.id
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
