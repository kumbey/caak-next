import { useEffect, useState } from "react";
import Select from "./Select";

const DateSelect = ({ value, errorMessage, onChange, startYear, ...props }) => {
  const [year, setYear] = useState();
  const [month, setMonth] = useState();
  const [day, setDay] = useState();
  const [daysOfCurrentMonth, setDaysOfCurrentMonth] = useState();
  const months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  const [days, setDays] = useState([]);
  const [bDay, setBDay] = useState();
  useEffect(() => {
    onChange(bDay);
  }, [bDay]);

  useEffect(() => {
    if (value) {
      const splited = value.split("-");
      setYear(splited[0]);
      setMonth(splited[1].replace(/^0+/, ""));
      setDay(splited[2].replace(/^0+/, ""));
    }
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (year && month && day) {
      setBDay(
        `${year}-${month.length === 1 ? `0${month}` : month}-${
          day.length === 1 ? `0${day}` : day
        }`
      );
    }
    // eslint-disable-next-line
  }, [year, month, day]);

  const endYear = new Date().getFullYear();
  const [dates, setDates] = useState([]);

  useEffect(() => {
    const dates = [];
    let strtyear = startYear;
    while (strtyear <= endYear) {
      dates.push(strtyear);
      strtyear++;
    }
    setDates(dates.reverse());
    // eslint-disable-next-line
  }, [startYear]);

  function daysInMonth(month) {
    return new Date(0, month, 0).getDate();
  }

  useEffect(() => {
    const days = [];
    for (let i = 1; i <= daysOfCurrentMonth; i++) {
      days.push(i);
    }
    setDays(days);
  }, [daysOfCurrentMonth]);

  useEffect(() => {
    setDaysOfCurrentMonth(daysInMonth(month));
  }, [month]);

  return (
    <div>
      <div className={"flex justify-between"}>
        <Select
          value={month || "DEFAULT"}
          name={"month"}
          onChange={(e) => setMonth(e.target.value)}
          containerStyle={"flex-1 mr-2"}
          className="h-c9 w-c14 bg-caak-lynxwhite"
        >
          <option disabled hidden value={"DEFAULT"}>
            {"Сар"}
          </option>
          {months.map((month, index) => (
            <option key={index} value={month}>
              {`${month}-р сар`}
            </option>
          ))}
        </Select>
        <Select
          value={day || "DEFAULT"}
          name={"day"}
          onChange={(e) => setDay(e.target.value)}
          containerStyle={"flex-1 mr-2"}
          className="h-c9 w-c14 bg-caak-lynxwhite"
        >
          <option disabled hidden value="DEFAULT">
            {"Өдөр"}
          </option>
          {days.map((day, index) => (
            <option key={index} value={day}>
              {`${day}`}
            </option>
          ))}
        </Select>

        <Select
          value={year || "DEFAULT"}
          name={"year"}
          onChange={(e) => setYear(e.target.value)}
          containerStyle={"flex-1 mr-2"}
          className="h-c9 bg-caak-lynxwhite"
        >
          <option disabled hidden value="DEFAULT">
            {"Он"}
          </option>
          {dates.map((year, index) => (
            <option key={index} value={year}>
              {`${year}`}
            </option>
          ))}
        </Select>
      </div>
      <p className="text-13px error text-left">{errorMessage}</p>
    </div>
  );
};

export default DateSelect;
