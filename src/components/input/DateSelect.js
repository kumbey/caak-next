import { useEffect, useState } from "react";
import Select from "./Select";

const DateSelect = ({ value, errorMessage, onChange, startYear, ...props }) => {
  const [year, setYear] = useState();
  const [month, setMonth] = useState();
  const [day, setDay] = useState();
  const [daysOfCurrentMonth, setDaysOfCurrentMonth] = useState();
  const months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  const [days, setDays] = useState([]);

  useEffect(() => {
    if (value) {
      let splited = value.split("-");
      setYear(splited[0]);
      setMonth(splited[1]);
      setDay(splited[2]);
    }
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    console.log(`${year} ${month} ${day}`);
    if (year && month && day) {
      onChange({
        target: {
          name: props.name,
          value: `${year}-${month}-${day}`,
        },
      });
    }
    console.log(day);
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
    setDates(dates);
    // eslint-disable-next-line
  }, [startYear]);

  function daysInMonth(month, year) {
    return new Date(year, month, 0).getDate();
  }

  useEffect(() => {
    const days = [];
    for (let i = 1; i <= daysOfCurrentMonth; i++) {
      days.push(i);
    }
    setDays(days);
  }, [daysOfCurrentMonth]);

  useEffect(() => {
    setDaysOfCurrentMonth(daysInMonth(month, year));
  }, [month, year]);

  return (
    <div>
      <div className={"flex justify-between"}>
        <Select
          value={year || "DEFAULT"}
          name={"year"}
          onChange={(e) => setYear(e.target.value)}
          containerStyle={"flex-1 mr-2"}
          className="h-c9 bg-caak-titaniumwhite"
        >
          <option disabled value="DEFAULT">
            {"Он"}
          </option>
          {dates.map((year, index) => (
            <option key={index} value={year}>
              {`${year}`}
            </option>
          ))}
        </Select>
        <Select
          value={month || "DEFAULT"}
          name={"month"}
          onChange={(e) =>
            setMonth(() => {
              let length = e.target.value.toString().length;
              if (length === 2) return `${e.target.value}`;
              return `0${e.target.value}`;
            })
          }
          containerStyle={"flex-1 mr-2"}
          className="h-c9 w-c14 bg-caak-titaniumwhite"
        >
          <option disabled value={"DEFAULT"}>
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
          onChange={(e) =>
            setDay(() => {
              let length = e.target.value.toString().length;
              if (length === 2) return `${e.target.value}`;
              return `0${e.target.value}`;
            })
          }
          containerStyle={"flex-1"}
          className="h-c9 w-c14 bg-caak-titaniumwhite"
        >
          <option disabled value="DEFAULT">
            {"Өдөр"}
          </option>
          {days.map((day, index) => (
            <option key={index} value={day}>
              {`${day}`}
            </option>
          ))}
        </Select>
      </div>
      <p className="text-13px error text-left">{errorMessage}</p>
    </div>
  );
};

export default DateSelect;
