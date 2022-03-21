import file0001 from "../../file/fields/file0001";

const group0002 = /* GraphQL */ `{
    id
    name
    meta
    category_id
    role_on_group
    totals {
        member
        moderator
        admin
    }
    profile ${file0001}
}`;

export default group0002;
