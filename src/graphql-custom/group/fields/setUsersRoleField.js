const setUsersRoleField = /* GraphQL */ `
  {
    group_id
    user_id
    role
    user {
      id
      firstname
      nickname
    }
  }
`;

export default setUsersRoleField;
