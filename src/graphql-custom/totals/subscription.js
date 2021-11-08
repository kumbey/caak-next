import totals0001 from "./fields/totals0001";


export const onChangedTotalsBy = /* GraphQL */ `
  subscription OnChangedTotalsBy($type: String!, $id: ID!) {
    onChangedTotalsBy(type: $type, id: $id) ${totals0001}
  }
`;