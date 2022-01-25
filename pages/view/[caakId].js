import { withSSRContext } from "aws-amplify";
import { listPostByOldId } from "../../src/graphql-custom/post/queries";
import { getReturnData } from "../../src/utility/Util";

export async function getServerSideProps({ req, query }) {
  const { API } = withSSRContext({ req });
  const caakId = query.caakId;

  const getListPostByOldId = async () => {
    try {
      let resp = await API.graphql({
        query: listPostByOldId,
        variables: {
          oldCaakId: caakId,
        },
        authMode: "AWS_IAM",
      });
      resp = getReturnData(resp);
      return resp;
    } catch (ex) {
      console.log(ex);
    }
  };

  const oldPost = await getListPostByOldId();
  if (oldPost) {
    if (oldPost.items[0]?.oldCaakId === caakId) {
      return {
        props: {},
        redirect: {
          destination: `/post/view/${oldPost.items[0].id}`,
          permanent: false,
        },
      };
    } else {
      return {
        props: {},
        redirect: {
          destination: `https://old.caak.mn/view/${caakId}`,
          permanent: false,
        },
      };
      // return { notFound: true };
    }
  } else {
    return {
      props: {},
      redirect: {
        destination: `https://old.caak.mn/view/${caakId}`,
        permanent: false,
      },
    };
    // return { notFound: true };
  }
}

const CaakNews = () => {
  return null;
};

export default CaakNews;
