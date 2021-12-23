import { useRouter } from "next/router";
import { _modalisOpen } from "../../utility/Util";
import Post from "../../../pages/post/view/[id]";
import { Auth } from "aws-amplify";
import { ssrDataViewPost } from "../../apis/ssrDatas";
import { API } from "aws-amplify";
import { Fragment, useEffect, useState } from "react";

const ViewPostModal = () => {

  const router = useRouter();
  const { isModal } = router.query;
  const [ssrData, setSsrData] = useState(null)
  const [show, setShow] = useState(false)

  const showModal = async () => {
      
      if(router.isReady && isModal){
        if(router.query.viewPost === "post"){
          setShow(true)
          const resp = await ssrDataViewPost({ API ,Auth, query: router.query  })
          setSsrData(resp.props.ssrData)   
        }else{
          setSsrData(null)
          setShow(false)
        }
      }else{
        setSsrData(null)
        setShow(false)
      }
  }

  useEffect(() => {
    showModal()
  },[router.query])

  return (
    <Fragment>
      {
        show ? (
          ssrData ? <Post ssrData={ssrData}/> : "Loading"
        ) : null
      }
    </Fragment>
  )
};

export default ViewPostModal;