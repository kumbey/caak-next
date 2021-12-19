import file0001 from "../../file/fields/file0001";
import user0001 from "../../user/fields/user0001";

const group0001 = /* GraphQL */ `{
    id
    g_rules
    name
    g_rules
    g_attentions
    category_id
    category{
        name
        icon
    } 
    profile ${file0001}
    cover ${file0001}
    about
    founder_id
    founder ${user0001}
    rating
    followed
    role_on_group
    createdAt
    totals{
        admin
        confirmed
        member
        pending
        unseen
        moderator
    }
}`;

export default group0001;
