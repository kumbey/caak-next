import file0001 from "../../file/fields/file0001";

const groupUsers0002 = /* GraphQL */ `{
    id
    group_id
    group {
        profile ${file0001}
        name
        totals {
            admin
            member
            moderator
        }
        id
        role_on_group
    }
}`;

export default groupUsers0002;
