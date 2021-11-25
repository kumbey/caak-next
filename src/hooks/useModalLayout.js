import DefaultModalLayout from "../components/layouts/modal/default";
import StepModalLayout from "../components/layouts/modal/stepLayout";
import ViewPostModalLayout from "../components/layouts/modal/viewPostModalLayout";

const layouts = {
  default: DefaultModalLayout,
  step: StepModalLayout,
  viewpost: ViewPostModalLayout,
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
