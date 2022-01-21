import banner0001 from "./fields/banner0001";

export const listBanners = /* GraphQL */ `
    query listBanners($filter: ModelBannerFilterInput, $limit: Int, $nextToken: String) {
        listBanners(
            filter: $filter, 
            limit: $limit, 
            nextToken: $nextToken
        ) {
            items ${banner0001}
        }
    }
`;