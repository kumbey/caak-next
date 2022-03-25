import { API } from "aws-amplify";
import { listBoostedPostByStatusOrderByEndDate } from "../../../../graphql-custom/post/queries";
import { getReturnData, shuffleArray } from "../../../../utility/Util";
import { useEffect, useState } from "react";
import NavbarPostHeaderCard from "./NavbarPostHeaderCard";

const NavbarPostHeader = () => {
  const [boostedPosts, setBoostedPosts] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchBoostedPosts = async () => {
    const date = new Date();
    const now = date.toISOString();
    try {
      setLoading(true);
      let resp = await API.graphql({
        query: listBoostedPostByStatusOrderByEndDate,
        variables: {
          status: "ACTIVE",
          sortDirection: "DESC",
          end_date: { gt: now },
        },
        authMode: "AWS_IAM",
      });
      resp = getReturnData(resp);
      shuffleArray(resp.items);
      setBoostedPosts(resp.items);
      setLoading(false);
    } catch (ex) {
      console.log(ex);
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchBoostedPosts();
  }, []);
  return !loading ? (
    <div
      className={
        "relative flex flex-col lg:flex-row items-center justify-center h-full min-h-[436px] bg-blue-500 w-full"
      }
    >
      <div className={"absolute z-[1] top-0 w-full navbarGradient h-[139px]"} />
      {/*<div className={"flex flex-row items-center"}>*/}
      {boostedPosts.length > 0 && <div style={{ flex: 1 }} className={"h-full w-full"}>
        <NavbarPostHeaderCard type={"wide"} item={boostedPosts[0].post} />
      </div>}

      <div style={{ flex: 1 }} className={"flex flex-row w-full h-full"}>
        {boostedPosts.map((post, index) => {
          if (index !== 0 && index <= 2) {
            return (
              <div key={index} style={{ flex: 1 }} className={"h-full w-full"}>
                <NavbarPostHeaderCard
                  index={index}
                  key={post.post.id}
                  item={post.post}
                />
              </div>
            );
          }
        })}
      </div>
      {/*</div>*/}
    </div>
  ) : null;
};

export default NavbarPostHeader;
