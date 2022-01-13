import file0001 from "../../file/fields/file0001";

const group0005 = /* GraphQL */ `{
    id
    name
    aura
    followed
    totals {
        member
        admin
        moderator
    }
    profile ${file0001}
    cover ${file0001}
}`;

export default group0005;
