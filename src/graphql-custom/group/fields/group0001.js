import file0001 from "../../file/fields/file0001"
import user0001 from "../../user/fields/user0001"

const group0001 = /* GraphQL */ `{
    id
    name
    category_id
    profile ${file0001}
    cover ${file0001}
    about
    founder_id
    founder ${user0001}
    rating
    followed
    role_on_group
    totals{
        admin
        confirmed
        member
        pending
        unseen
        moderator
    }
}`

export default group0001