import { API, graphqlOperation } from "aws-amplify";
import { updatePost } from "../../graphql-custom/post/mutation";

const PostDeleteConfirm = ({post, setOpen}) => {

    const postHandler = async ({ id, status }) => {
        try {
          await API.graphql(
            graphqlOperation(updatePost, {
              input: { id, status, expectedVersion: post.version },
            })
          );
        } catch (ex) {
        //   setLoading(false);
          console.log(ex);
        }
        setOpen(false);
      };

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