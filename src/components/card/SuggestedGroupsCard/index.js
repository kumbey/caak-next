import SuggestedGroupsCardItem from "./SuggestedGroupsCardItem";
import ViewMoreText from "../SideBarGroups/ViewMoreText";
import { useEffect, useState } from "react";
import { API } from "aws-amplify";
import { listGroupByFeatured } from "../../../graphql-custom/group/queries";
import { getReturnData } from "../../../utility/Util";
import {useUser} from "../../../context/userContext";

const SuggestedGroupsCard = ({ className, title, maxColumns }) => {
  const [suggestedGroups, setSuggestedGroups] = useState({});
  const [loading, setLoading] = useState(true);
  const {isLogged} = useUser()

  const fetchSuggestedGroups = async () => {
    setLoading(true);
    try {
      let resp = await API.graphql({
        query: listGroupByFeatured,
        variables: {
          featured: "true",
        },
        authMode: isLogged ? "AMAZON_COGNITO_USER_POOLS" : "AWS_IAM"
      });
      resp = getReturnData(resp);
      setSuggestedGroups(resp);
    } catch (ex) {
      console.log(ex);
    }
    setLoading(false);
  };
  useEffect(() => {
    fetchSuggestedGroups();
    // eslint-disable-next-line
  }, []);

  return !loading ? (
    <div
      className={`suggestedGroupsCard bg-white shadow-card py-[18px]  ${
        className ? className : ""
      } flex flex-col bg-white w-ci rounded-square `}
    >
      <div
        className={
          "text-15px pb-[7px] px-[18px] text-caak-extraBlack font-semibold"
        }
      >
        {title}
      </div>
      {/*<div*/}
      {/*  className={*/}
      {/*    "bg-caak-primary bg-opacity-[0.06] px-[18px] py-[4px] border-l-[3px] border-opacity-[0.6] border-caak-primary"*/}
      {/*  }*/}
      {/*>*/}
      {/*  <SuggestedGroupsCardItem*/}
      {/*    members={"13.2k"}*/}
      {/*    name={"COREX хэрэглэгчдийн групп"}*/}
      {/*    verified*/}
      {/*  />*/}
      {/*  <SuggestedGroupsCardItem*/}
      {/*    members={"32.4k"}*/}
      {/*    name={"Дизайнеруудын бригад"}*/}
      {/*    verified*/}
      {/*  />*/}
      {/*  <SuggestedGroupsCardItem*/}
      {/*    verified*/}
      {/*    members={"58.1k"}*/}
      {/*    name={"Тархи цэнэглэгч номын клубын өрөө"}*/}
      {/*  />*/}
      {/*</div>*/}
      <div className={"px-[18px] py-[4px]"}>
        {suggestedGroups.items.map((item, index) => {
          return <SuggestedGroupsCardItem key={index} group={item} />;
        })}
        {/*<SuggestedGroupsCardItem members={"13.2k"} name={"Computer Land"} />*/}
        {/*<SuggestedGroupsCardItem*/}
        {/*  members={"1k"}*/}
        {/*  name={"Taste it. Энийг хар даа!"}*/}
        {/*/>*/}
      </div>

      {suggestedGroups.items.length > maxColumns ? (
        <div className={"px-[18px]"}>
          <ViewMoreText text={"Илүү ихийг үзэх"} />
        </div>
      ) : null}
    </div>
  ) : null;
};

export default SuggestedGroupsCard;
