import file0001 from "../../file/fields/file0001";

const notification0001 = /* GraphQL */ `{
    action
    from
    createdAt
    id
    item_id
    section
    seen
    to
    type
    updatedAt
    version
    from_user {
        about
        nickname
        pic ${file0001}
    }
}`;

export default notification0001;
