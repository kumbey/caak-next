import { API } from "aws-amplify";
import { useUser } from "../../context/userContext";
import { deleteComment } from "../../graphql-custom/comment/mutation";

const DeleteCommentConfirm = ({open, setOpen, comment}) => {
    const {isLogged} = useUser()

    const deleteComments = async (id) => {
        if (isLogged)
          try {
            // setLoading(true);
            await API.graphql({
              query: deleteComment,
              variables: {
                input: {
                  id: id,
                },
              },
              authMode: 'AMAZON_COGNITO_USER_POOLS'
            });
    
            // setLoading(false);
          } catch (ex) {
            // setLoading(false);
            console.log(ex);
          }
      };
    
      const handleDelete = async () => {
        await deleteComments(comment.id);
        setOpen(false)
      };

    return open ? (
        <div className="popup_modal">
            <div className="popup_modal-leaveGroup rounded-[8px] px-[10px] py-[30px]">
                <p className="text-center font-medium text-[16px]">{`Та сэтгэгдлээ устгахдаа итгэлтэй байна уу?`}</p>
                <div className="flex flex-row justify-evenly mt-[20px]">
                    <p onClick={() => setOpen(false)} className="cursor-pointer flex justify-center items-center bg-[#F3F3F4] rounded-[8px] font-semibold w-[100px] h-[36px]">
                        буцах
                    </p>
                    <p onClick={() => handleDelete(comment.id)} className="cursor-pointer flex justify-center items-center text-white bg-[#FF6600] rounded-[8px] font-semibold w-[100px] h-[36px]">
                        тийм
                    </p>
                </div>
            </div>
        </div>
    ) : null
}

export default DeleteCommentConfirm;