import InfinitScroller from "../layouts/extra/InfinitScroller";
import { DateTime } from "luxon";
import { numberWithCommas } from "../../utility/Util";
import { useListPager } from "../../utility/ApiHelper";
import { listAccountHistoryByUser } from "../../graphql-custom/accountingHistory/queries";
import { useUser } from "../../context/userContext";
import { useState } from "react";
import {useRouter} from 'next/router'

const AccountHistoryInfinite = () => {
  const { user } = useUser();
  const router = useRouter()
  const [loading, setLoading] = useState(false);
  const [totalBalance, setTotalBalance] = useState({
    deposit: 0,
    withdraw: 0,
  });
  const [accountingHistories, setAccountingHistories] = useState({
    items: [],
    nextToken: "",
  });

  const [nextAccountingHistory] = useListPager({
    query: listAccountHistoryByUser,
    variables: {
      user_id: user.id,
      sortDirection: "ASC",
    },
    nextToken: accountingHistories.nextToken,
    // ssr: true,
  });
  const fetchAccountingHistories = async () => {
    try {
      if (!loading) {
        setLoading(true);

        const resp = await nextAccountingHistory();
        const totals = {
          withdraw: 0,
          deposit: 0,
        };
        if (resp) {
          resp.map((item) => {
            if (item.status === "INCREASE") {
              totals.deposit = totals.deposit + item.amount;
            } else {
              totals.withdraw = totals.withdraw + item.amount;
            }
          });
          setTotalBalance({ ...totals });
          setAccountingHistories((nextAccountingHistory) => ({
            ...nextAccountingHistory,
            items: [...nextAccountingHistory.items, ...resp],
          }));
        }

        setLoading(false);
      }
    } catch (ex) {
      setLoading(false);
      console.log(ex);
    }
  };
  return (
    <div className="flex flex-col relative bg-caak-emptiness">
      <InfinitScroller onNext={fetchAccountingHistories} loading={loading}>
        
      
      {!loading && accountingHistories.items.length === 0 ? (
        <div className="flex items-center justify-center h-80">
          <p className="text-sm">
          ???????? ???????????? ???????????? ???????????????? ??????????. ???????????? ???? ???????????????????????? ???????????????????? ?????? &nbsp;
            <strong
              onClick={() =>
                router.push(
                  {
                    pathname: '/help/ads',
                    query: {
                      tab: 1
                    },
                  },
                  `/help/ads`,
                  { shallow: true }
                )
              }
              className="text-[#0000EE] cursor-pointer"
            >
              ?????? &nbsp;
            </strong>
            ???????? ???????????? ??????????????????????!
          </p>
        </div>
      ) : 
        <table className="w-full table">
          <thead className="sticky top-0 h-full w-full bg-caak-emptiness font-bold">
            <tr>
              <th className="text-left mr-[18px] font-inter text-14px text-caak-generalblack">
                ??????????
              </th>
              <th className="text-left mr-[18px] font-inter text-14px text-caak-generalblack">
                ????????????
              </th>
              <th className="text-left mr-[18px] font-inter text-14px text-caak-generalblack">
                ??????????????
              </th>
              <th className="text-left mr-[18px] font-inter text-14px text-caak-generalblack">
                ???????????????????? ????????
              </th>
              <th className="text-left mr-[18px] font-inter text-14px text-caak-generalblack">
                ????????????????
              </th>
            </tr>
          </thead>
          <tfoot className={"sticky bottom-0 bg-caak-emptiness"}>
            <tr
              className={
                "text-[14px] tracking-[0.21px] leading-[16px] text-caak-generalblack border-t "
              }
            >
              <td className={"font-semibold"}>????????</td>
              <td className={"font-semibold"}>
                {numberWithCommas(totalBalance.deposit, ".")}???
              </td>
              <td>{numberWithCommas(totalBalance.withdraw, ".")}???</td>
              <td />
              <td className={"font-semibold"}>
                {numberWithCommas(
                  totalBalance.withdraw + totalBalance.deposit,
                  "."
                )}
                ???
              </td>
            </tr>
          </tfoot>
          <tbody>
            {accountingHistories.items.length > 0 &&
              accountingHistories.items.map((history, index) => {
                const meta = JSON.parse(history.meta);
                const description = JSON.parse(meta.description);
                const descriptionHandler = (desc) => {
                  if (desc.type === "REFUND") return "??????????????";
                  if (desc.type === "CHARGE") return "???????? ??????????????????";
                  if (desc.type === "POST_BOOST") return "???????? ??????????";
                };
                const { year, month, day, hour, minute } = DateTime.fromISO(
                  history.createdAt
                );
                return (
                  <tr
                    key={index}
                    className="border-t border-b mb-2 text-[14px] text-caak-generalblack"
                  >
                    <td>
                      <p>{`${year}.${month}.${day} ${hour}:${minute}`}</p>
                    </td>
                    <td>
                      <p>
                        {history.status === "INCREASE"
                          ? numberWithCommas(history.amount, ".")
                          : 0}
                        ???
                      </p>
                    </td>
                    <td>
                      <p className={"text-[#5D636B]"}>
                        {history.status === "DECREASE"
                          ? numberWithCommas(history.amount, ".")
                          : 0}
                        ???
                      </p>
                    </td>
                    <td>
                      <p className={"text-[#5D636B]"}>
                        {descriptionHandler(description)}
                      </p>
                    </td>
                    <td>
                      <p>{numberWithCommas(meta.balance, ".")}???</p>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
        }
      </InfinitScroller>
    </div>
  );
};

export default AccountHistoryInfinite;
