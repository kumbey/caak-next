import { API, graphqlOperation } from "aws-amplify";
import { useUser } from "../../context/userContext";
import { deleteGroupUsers } from "../../graphql-custom/GroupUsers/mutation";

const LeaveGroup = ({open, setOpen, groupData, setForceRender, forceRender, setLoading}) => {
    const {user} = useUser()

    const leave = async () => {
        try{
            await API.graphql(
                graphqlOperation(deleteGroupUsers, {
                    input: {
                    id: `${groupData.id}#${user.id}`,
                    },
                })
            );
            groupData.followed = false;
            groupData.totals.member -= 1;
            // setForceRender(forceRender + 1);
            setOpen(false)
            setLoading(false)
        }catch(ex){
            console.log(ex)
        }
        setLoading(false)
    } 

    return open ? (
        <div className="popup_modal">
            <div className="popup_modal-leaveGroup rounded-[8px] px-[10px] py-[30px]">
                <p className="text-center font-medium text-[16px]">{`Та "${groupData.name}" группээс гарахдаа итгэлтэй байна уу?`}</p>
                {
                    groupData.role_on_group === "MODERATOR"
                    ?
                    <p className="text-center font-semibold text-[12px]">{`Группын модератор эрх хасагдах болохыг анхаарна уу!`}</p>
                    :
                    groupData.role_on_group === "ADMIN"
                    ?
                    <p className="text-center font-semibold text-[12px]">{`Группын админ эрх хасагдах болохыг анхаарна уу!`}</p>
                    :
                    null
                }
                <div className="flex flex-row justify-evenly mt-[20px]">
                    <p onClick={() => setOpen(false)} className="cursor-pointer flex justify-center items-center bg-[#F3F3F4] rounded-[8px] font-semibold w-[100px] h-[36px]">
                        буцах
                    </p>
                    <p onClick={() => leave()} className="cursor-pointer flex justify-center items-center text-white bg-[#FF6600] rounded-[8px] font-semibold w-[100px] h-[36px]">
                        тийм
                    </p>
                </div>
            </div>
        </div>
    ) : null
}

export default LeaveGroup;