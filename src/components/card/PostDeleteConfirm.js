import { API, graphqlOperation } from "aws-amplify";
import { updatePost } from "../../graphql-custom/post/mutation";
import toast from "react-hot-toast";
import {useRouter} from 'next/router'
import { useUser } from "../../context/userContext";

const PostDeleteConfirm = ({post, setOpen}) => {
  const router = useRouter()
  const {user} = useUser()

    const postHandler = async ({ id, status }) => {
        try {
          await API.graphql(
            graphqlOperation(updatePost, {
              input: { id: id, status: status, expectedVersion: post.version },
            })
          );
          toast.custom(<div>
            <div className="bg-white p-[10px] rounded-[8px] flex flex-row">Таны пост амжилттай устгагдлаа.
              <p className="cursor-pointer ml-[5px]" onClick={() => router.push(
              {
                pathname: `/user/${user.id}/dashboard`,
                query: {
                  activeIndex: 3,
                },
              },
              `/user/${user.id}/dashboard`
            )}>
                 Дашбоард харах
              </p>
            </div>
          </div> )
          setOpen(false)
        } catch (ex) {
          console.log(ex);
          toast.error("Алдаа гарлаа.")
        }
      }

    return  (
        <div className="popup_modal">
            <div className="popup_modal-leaveGroup rounded-[8px] px-[10px] py-[30px]">
                <p className="text-center font-semibold text-[12px]">Та энэ постыг устгахдаа итгэлтэй байна уу?</p>
                <div className="flex flex-row justify-evenly mt-[20px]">
                    <p onClick={() => setOpen(false)} className="cursor-pointer flex justify-center items-center bg-[#F3F3F4] rounded-[8px] font-semibold w-[100px] h-[36px]">
                        буцах
                    </p>
                    <p 
                    onClick={() =>
                        postHandler({
                            id: post.id,
                            status: "ARCHIVED",
                        })
                    } 
                    className="cursor-pointer flex justify-center items-center text-white bg-[#FF6600] rounded-[8px] font-semibold w-[100px] h-[36px]">
                        тийм
                    </p>
                </div>
            </div>
        </div>
    ) 
}

export default PostDeleteConfirm;