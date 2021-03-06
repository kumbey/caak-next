import { useRouter } from "next/router";
import SignInUp from "../../../pages/signInUp/[signInUp]";
import In from "/pages/signInUp/in";
import Up from "../../../pages/signInUp/up";
import Complete from "../../../pages/signInUp/complete";
import Confirm from "../../../pages/signInUp/confirm";
import { _modalisOpen } from "../../utility/Util";
import Information from "../../../pages/signInUp/information";
import Intrst from "../../../pages/signInUp/intrst";
import ForgotPassword from "../../../pages/signInUp/forgotpassword";
import { Auth } from "aws-amplify";
import { API } from "aws-amplify";
import { Fragment, useEffect, useState } from "react";
import SelectGroups from "../../../pages/signInUp/selectGroups";
import ResetPassword from "../../../pages/signInUp/resetPassword";

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
    comp: ForgotPassword,
    conditions: [
      {
        key: "signInUp",
        value: "forgotpassword",
      },
    ],
  },
  {
    name: "signInUp",
    comp: ResetPassword,
    conditions: [
      {
        key: "signInUp",
        value: "resetPassword",
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
    comp: SelectGroups,
    conditions: [
      {
        key: "signInUp",
        value: "groups",
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
];

const Modals = () => {

  const router = useRouter();
  const { isModal } = router.query;
  const [showing, setShowing] = useState(null) 

  const showModal = async () => {
      for(let index=0; index < modals.length; index++){

        const modal = modals[index]
        if (router.isReady && isModal) {
          if (
            _modalisOpen({
              conditions: modal.conditions,
              query: router.query,
            })
          ) {
            if(modal.ssr){
              const resp = await modal.ssr({ API ,Auth, query: router.query  })
              setShowing({...modal, ssrData: resp.props.ssrData})
            }else{
              setShowing(modal)
            }

            break
          } else {
            setShowing(null)
          }
        } else {
          setShowing(null)
        }
      }
  }

  useEffect(() => {
    showModal()
    // eslint-disable-next-line
  },[router.query])

  return (
    <Fragment>
      {
        showing ? 
          (
            showing.ssrData ? <showing.comp ssrData={showing.ssrData}/> : <showing.comp/>
          )
        : null
      }
    </Fragment>
  )
};

export default Modals;
