import file0001 from "../../file/fields/file0001";

const group0011 = /* GraphQL */ `{
    items {
        id
        name
        profile ${file0001}
        totals{
            member
            admin
            moderator
        }
    }

}`;

export default group0011;
