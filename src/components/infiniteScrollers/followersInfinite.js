import FollowerList from "../list/FollowerList";
import InfinitScroller from "../layouts/extra/InfinitScroller";

const FollowersInfinite = ({
  followedUsers,
  setFollowedUsers,
  fetcher,
  loading,
}) => {
  return (
    <InfinitScroller onNext={fetcher} loading={loading}>
      <div className="mt-[14px] flex flex-row flex-wrap justify-between">
        {followedUsers.items.map((data, index) => {
          return (
            <FollowerList
              key={index}
              imageSrc={data?.pic}
              followedUser={data}
              followedUsers={followedUsers}
              setFollowedUsers={setFollowedUsers}
            />
          );
        })}
      </div>
    </InfinitScroller>
  );
};

export default FollowersInfinite;
