import user0001 from "./fields/user0001";

export const onUserUpdateByUser = /* GraphQL */ `
  subscription OnUserUpdateByUser($id: ID!) {
    onUserUpdateByUser(id: $id) ${user0001}
  }
`;

export const onUpdateUser = /* GraphQL */ `
  subscription OnUpdateUser{
    onUpdateUser{ 
      about
      aura
      birthdate
      cover_pic_id
      firstname
      followed
      gender
      id
      is_public
      lastname
      nickname
      pic_id
      verified
     }
  }
`;