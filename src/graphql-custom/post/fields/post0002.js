import postItems0001 from "../../postItems/fields/fileItems0001";
import file0001 from "../../file/fields/file0001";

const post0002 = /* GraphQL */ `{
    id
    title
    description
    commentType
    owned
    status
    user_id
    group_id
    category_id
    updatedAt
    version
    user {
        firstname
        id
        pic ${file0001}
    }
    items {
        items ${postItems0001}
    }
}`;

export default post0002;
