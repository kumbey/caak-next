import report0002 from "./fields/report0002";

export const listReportTypes = /* GraphQL */ `
  query ListReportTypes(
    $filter: ModelReportTypeFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listReportTypes(filter: $filter, limit: $limit, nextToken: $nextToken) {
     ${report0002}
      nextToken
    }
  }
`;
