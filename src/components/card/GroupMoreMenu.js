import { useRouter } from 'next/router';
import React from 'react'
import { useUser } from '../../context/userContext';

export default function GroupMoreMenu({setIsOpen}) {
    const {isLogged} = useUser()
    const router = useRouter()
    return (
        <div className={"dropdown-item-wrapper"}>
            <div className="hover:bg-caak-liquidnitrogen h-c25 dropdown-items flex items-center cursor-pointer">
                <span
                    className={"icon-fi-rs-save-o  mr-px-12 w-c1  text-16px"}
                />
                <p className="text-14px text-caak-extraBlack">
                    Хадгалах
                </p>
            </div>
            <div className="hover:bg-caak-liquidnitrogen h-c25 dropdown-items flex items-center cursor-pointer">
                <span className={"icon-fi-rs-edit mr-px-12 w-c1  text-16px"} />
                <p className="text-14px text-caak-extraBlack">Постыг засах</p>
            </div>
            <div
                onClick={() => {
                isLogged
                    ? setIsOpen(true)
                    : router.push(
                        {
                        pathname: router.pathname,
                        query: {
                            ...router.query,
                            signInUp: "signIn",
                            isModal: true,
                            prevPath: router.asPath
                        },
                        },
                        `/signInUp/signIn`,
                        { shallow: true }
                    );
                }}
                className="hover:bg-caak-liquidnitrogen h-c25 dropdown-items flex items-center cursor-pointer"
            >
                <span className={"icon-fi-rs-flag mr-px-12 w-c1  text-16px"} />
                <p className="text-14px text-caak-extraBlack">Репорт</p>
            </div>
        </div>
    )
}
