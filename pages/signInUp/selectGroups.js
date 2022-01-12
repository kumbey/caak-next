import Groups from "../../src/components/register/groups/groups";
import WithSelectGroupsComplete from "../../src/middleware/auth/WithSelectGroupsComplete";

const SelectGroups = () => {
  return (
    <div className="popup_modal">
      <div className="popup_modal-groups flex items-center justify-center w-full">
        <Groups />
      </div>
    </div>

  );
};

export default WithSelectGroupsComplete(SelectGroups);
