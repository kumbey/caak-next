import file0001 from "../../file/fields/file0001";

const user0001 = /* GraphQL */ `{
    id
    firstname
    lastname
    nickname
    birthdate
    gender
    pic_id
    cover_pic_id
    about
    is_public
    status
    createdAt
    updatedAt
    aura
    pic ${file0001}
    cover_pic ${file0001}
    followed
    username {
        id_name
    }
    category{
      items{
        id
      }
    }
    totals {
      followers
      following
      confirmed
    }
  }`;

export default user0001;
