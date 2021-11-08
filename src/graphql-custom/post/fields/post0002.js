import postItems0001 from "../../postItems/fields/fileItems0001"
import file0001 from "../../file/fields/file0001";

const post0002 = /* GraphQL */ `{
    id
    title
    commentType
    status
    user_id
    group_id
    category_id
    updatedAt
    version
    user {
        firstname
        pic ${file0001}
    }
    items {
        items ${postItems0001}
    }
}`

export default post0002