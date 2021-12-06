import { useRouter } from "next/router";
import SignInUp from "../../../pages/signInUp/[signInUp]";
import In from "/pages/signInUp/in";
import Up from "/pages/signInUp/up";
import Complete from "../../../pages/signInUp/complete";
import Confirm from "../../../pages/signInUp/confirm";
import { _modalisOpen } from "../../utility/Util";
import ViewPostBlogItem from "../card/ViewPostBlogItem";
import Information from "../../../pages/signInUp/information";
import Intrst from "../../../pages/signInUp/intrst";

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
    comp: Up,
    conditions: [
      {
        key: "signInUp",
        value: "up",
      },
    ],
  },
  {
    name: "signInUp",
    comp: In,
    conditions: [
      {
        key: "signInUp",
        value: "in",
      },
    ],
  },
  {
    name: "signInUp",
    comp: Complete,
    conditions: [
      {
        key: "signInUp",
        value: "complete",
      },
    ],
  },
  {
    name: "signInUp",
    comp: Information,
    conditions: [
      {
        key: "signInUp",
        value: "information",
      },
    ],
  },
  {
    name: "signInUp",
    comp: Intrst,
    conditions: [
      {
        key: "signInUp",
        value: "intrst",
      },
    ],
  },
  {
    name: "signInUp",
    comp: Confirm,
    conditions: [
      {
        key: "signInUp",
        value: "confirm",
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
