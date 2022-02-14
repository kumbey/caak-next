import file0001 from "../../file/fields/file0001";

const post0007 = /* GraphQL */ `
    {
        id
        title
        description
        owned
        status
        updatedAt
        createdAt
        isSaved
        user {
            id
            verified
            nickname
            pic ${file0001}
        }
        group {
            id
            name
            profile ${file0001}
        }
        totals {
            comments
            createdAt
            reactions
            updatedAt
            views
        }
        reacted
        items {
            items {
                post_id
                description
                isEmbed
                id
                title
                file ${file0001}
                thumbnail_id
                thumbnail ${file0001}
                file ${file0001}
            }
        }
    }
`;

export default post0007;
