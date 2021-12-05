import DefaultModalLayout from "../components/layouts/modal/default";
import StepModalLayout from "../components/layouts/modal/stepLayout";
import ViewPostModalLayout from "../components/layouts/modal/viewPostModalLayout";
import DefaultUserProfileLayout from "../components/layouts/profile";

const layouts = {
  default: DefaultModalLayout,
  step: StepModalLayout,
  viewpost: ViewPostModalLayout,
  userProfile: DefaultUserProfileLayout,
};

const useModalLayout = (props) => {
  const layoutName = props && props.layoutName ? props.layoutName : "default";
  const layout = layouts[layoutName];

  if (!layout) {
    console.log(`${layoutName}: Layout not found`);
  }
  return layout;
};

export default useModalLayout;
