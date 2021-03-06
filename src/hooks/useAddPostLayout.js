import DefaultAddPostLayout from "../components/layouts/addpost";

const layouts = {
    default: DefaultAddPostLayout,
};

const useAddPostLayout = (props) => {
    const layoutName = props && props.layoutName ? props.layoutName : "default";
    const layout = layouts[layoutName];

    if (!layout) {
        console.log(`${layoutName}: Layout not found`);
    }

    return layout;
};

export default useAddPostLayout;
