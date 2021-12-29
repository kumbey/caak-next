import { useRouter } from "next/router";
import { Auth } from "aws-amplify";
import { ssrDataViewPostItem } from "../../apis/ssrDatas";
import { API } from "aws-amplify";
import { Fragment, useEffect, useState } from "react";
import PostItem from "../../../pages/post/view/[id]/[itemId]";

const ViewPostItemModal = () => {
  const router = useRouter();
  const { isModal } = router.query;
  const [ssrData, setSsrData] = useState(null);
  const [show, setShow] = useState(false);

  const showModal = async () => {
    if (router.isReady && isModal) {
      if (router.query.viewItemPost === "postItem") {
        setShow(true);
        const resp = await ssrDataViewPostItem({
          API,
          Auth,
          query: router.query,
        });
        setSsrData(resp.props.ssrData);
      } else {
        setSsrData(null);
        setShow(false);
      }
    } else {
      setSsrData(null);
      setShow(false);
    }
  };

  useEffect(() => {
    showModal();
    // eslint-disable-next-line
  }, [router.query]);

  return (
    <Fragment>
      {show ? ssrData ? <PostItem ssrData={ssrData} /> : "Loading" : null}
    </Fragment>
  );
};

export default ViewPostItemModal;
