import { getReturnData } from "../utility/Util";
import { getPostView } from "../graphql-custom/post/queries";

export const ssrDataViewPost = async ({API, Auth, query}) => {
    let user = null;
    try {
        user = await Auth.currentAuthenticatedUser();
    } catch (ex) {
        user = null;
    }
    const postId = query.id;
    const getPostById = async () => {
        const resp = await API.graphql({
        query: getPostView,
        authMode: user ? "AMAZON_COGNITO_USER_POOLS" : "AWS_IAM",
        variables: { id: postId },
        });
        if (
            getReturnData(resp).status === "ARCHIVED" ||
            getReturnData(resp).status === "PENDING"
        ) {
        if (user.attributes.sub !== getReturnData(resp).user.id) {
            return { notFound: true };
        }
        }
        return {
            props: {
                ssrData: {
                post: getReturnData(resp),
                },
            },
        };
    };
    try {
        return getPostById();
    } catch (ex) {
        console.log(ex);
    }
}