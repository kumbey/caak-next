import file0001 from "../../file/fields/file0001";

const group0006 = /* GraphQL */ `{
    id
    name
    aura
    profile ${file0001}
    cover ${file0001}
    about
    followed
    totals{
        admin
        member
        moderator
    }
    createdAt
    role_on_group
}`;

export default group0006;
