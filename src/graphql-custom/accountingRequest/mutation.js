export const createAccouningtRequest = /* GraphQL */ `
    mutation createAccouningtRequest($id: ID!
        $user_id: ID!
        $status: String!
        $userStatus: String!
        $pack: Int!
        $phoneNumber: String!
        $meta: String
        $createdAt: AWSDateTime
        $updatedAt: AWSDateTime!) {
        createAccouningtRequest(
            user_id: $user_id,
            status: $status,
            userStatus: $userStatus,
            pack: $pack,
            phoneNumber: $phoneNumber,
            meta: $meta,
            createdAt: $createdAt,
            updatedAt: $updatedAt )
    }
`;