import accountingRequest0001 from "./fields/accountingRequest0001";

export const createAccouningtRequest = /* GraphQL */ `
    mutation createAccouningtRequest($input: CreateAccouningtRequestInput!) {
        createAccouningtRequest(input: $input) ${accountingRequest0001}
    }
`;