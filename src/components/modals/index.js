import { useRouter } from "next/router";
import SignInUp from "../../../pages/signInUp/[signInUp]";
import StepIn from "/pages/signInUp/stepIn";
import StepUp from "/pages/signInUp/stepUp";
import Completed from "../../../pages/signInUp/completed";
import Confirmation from "../../components/register/Confirmation";
import { _modalisOpen } from "../../utility/Util";
import ViewPostBlogItem from "../card/ViewPostBlogItem";

const modals = [
  {
    name: "signInUp",
    comp: SignInUp,
    conditions: [
      {
        key: "signInUp",
        value: "signIn",
      },
      {
        key: "signInUp",
        value: "signUp",
      },
    ],
  },
  {
    name: "signInUp",
    comp: StepUp,
    conditions: [
      {
        key: "signInUp",
        value: "stepUp",
      },
    ],
  },
  {
    name: "signInUp",
    comp: StepIn,
    conditions: [
      {
        key: "signInUp",
        value: "stepIn",
      },
    ],
  },
  {
    name: "signInUp",
    comp: Completed,
    conditions: [
      {
        key: "signInUp",
        value: "completed",
      },
    ],
  },
  {
    name: "signInUp",
    comp: Confirmation,
    conditions: [
      {
        key: "signInUp",
        value: "confirmation",
      },
    ],
  },
  {
    name: "viewPostBlogItem",
    comp: ViewPostBlogItem,
    conditions: [
      {
        key: "postItemId",
        value: "confirmation",
      },
    ],
  },
];

const Modals = () => {
  const router = useRouter();
  const { isModal } = router.query;

  return modals.map((modal, index) => {
    // IF singIn not in query return null

    if (router.isReady && isModal) {
      if (
        _modalisOpen({
          conditions: modal.conditions,
          query: router.query,
        })
      ) {
        return <modal.comp key={index} />;
      } else {
        return null;
      }
    } else {
      return null;
    }
  });
};

export default Modals;
