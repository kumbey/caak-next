import { useState, useEffect } from "react";

import { API } from "aws-amplify";
import { graphqlOperation } from "@aws-amplify/api-graphql";

import { listReportTypes } from "../../graphql-custom/reportType/queries";
import { createReportedPost } from "../../graphql-custom/reportType/mutation";
import Button from "../button";

const ReportModal = ({ isOpen, setIsOpen, postId, userId }) => {
  const [loading, setLoading] = useState(false);
  const [reports, setReports] = useState([]);
  const [checked, setChecked] = useState();
  const [isNext, setIsNext] = useState(false);

  const initData = {
    reason: "",
    post_id: "",
    status: "",
    user_id: "",
    typeName: "",
  };

  let pl;

  const handleChange = (e) => {
    setChecked(e.target.value);
  };

  const finish = () => {
    setIsOpen(false);
    setIsNext(false);
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      initData.reason = checked;
      initData.post_id = postId;
      initData.user_id = userId;
      initData.status = "UNCHECKED";
      initData.typeName = "REPORTED_POST";

      await API.graphql(
        graphqlOperation(createReportedPost, { input: initData })
      );

      setLoading(false);
      setIsNext(true);
    } catch (ex) {
      setLoading(false);

      console.log(ex);
    }
  };

  useEffect(() => {
    API.graphql(
      graphqlOperation(listReportTypes, {
        filter: { status: { eq: "ACTIVE" } },
      })
    ).then((report) => {
      setReports(report.data.listReportTypes.items);
    });
  }, []);

  return isOpen ? (
    <div className="popup_modal z-[12]">
      <div className="popup_modal-report">
        <div className="bg-white rounded-xl py-[20px] px-[20px]">
          <div
            className={
              "pb-[17px] flex justify-center items-center relative  border-b "
            }
          >
            <div
              onClick={() => setIsOpen(false)}
              className={
                "flex items-center justify-center w-[30px] h-[30px] rounded-full bg-caak-titaniumwhite absolute right-0 top-[0px] cursor-pointer"
              }
            >
              <span className={"icon-fi-rs-close text-[14px]"} />
            </div>

            <p className="font-inter font-semibold text-20px text-caak-generalblack ">
              Репорт
            </p>
          </div>
          {!isNext ? (
            <>
              <div className="reportModalItemsContainer">
                {reports.map((report, index) => {
                  return (
                    <div
                      key={index}
                      className={`reportModalItem odd:border-r pl-[10px] flex items-center border-b py-[15px] min-w-[230px] cursor-pointer`}
                    >
                      <input
                        id={report.id}
                        type="radio"
                        onChange={(e) => handleChange(e)}
                        value={report.name}
                        checked={checked === report.name}
                        name="report"
                        className={`mr-2 ${pl}`}
                      />
                      <label
                        className="cursor-pointer font-inter font-normal text-15px"
                        htmlFor={report.id}
                      >
                        {report.name}
                      </label>
                    </div>
                  );
                })}
              </div>
              <div className="flex items-center justify-end mt-[30px]">
                <Button
                  onClick={() => setIsOpen(false)}
                  className="text-caak-generalblack font-inter font-medium  text-14px  bg-white border mr-[10px]"
                >
                  Болих
                </Button>
                <Button
                  loading={loading}
                  onClick={() => handleSubmit()}
                  className="bg-caak-bleudefrance font-inter font-medium  text-14px text-white"
                >
                  Илгээх
                </Button>
              </div>
            </>
          ) : (
            <div className="flex flex-col mt-[25px]">
              <div className="flex items-center mb-[20px]">
                <div className="flex items-center justify-center text-white text-17px w-[28px] h-[28px] bg-caak-algalfuel rounded-full mr-[8px]">
                  <span className="icon-fi-rs-thick-check" />
                </div>
                <p className="font-inter font-semibold text-16px text-caak-generalblack">
                  Бид таны репортыг хүлээн авлаа.
                </p>
              </div>
              <div className="flex items-center mb-[28px]">
                <div className="flex items-center justify-center text-caak-primary text-17px  h-[37px] bg-caak-primary bg-opacity-10 rounded-full mr-[8px] px-[23px]">
                  <span className="icon-fi-rs-check text-20px  mr-[8px]" />
                  <p className="font-inter font-normal text-15px text-caak-primary">
                    {checked}
                  </p>
                </div>
              </div>
              <div className=" border-t border-b mb-[20px]">
                <p className="py-[19px] font-inter font-normal text-caak-generalblack text-15px">
                  Та зөрчилтэй нийтлэлийг бидэнд мэдэгдсэнээр бусад болон
                  өөрийгөө хууль бус зүйлээс хамгаалж байгаа хэрэг юм.
                </p>
              </div>
              <div className="flex justify-end">
                <Button
                  loading={loading}
                  onClick={() => finish()}
                  className="bg-caak-bleudefrance font-inter font-medium  text-14px text-white"
                >
                  Дуусгах
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  ) : null;
};

export default ReportModal;
