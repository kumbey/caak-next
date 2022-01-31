import DateSelect from "./DateSelect";
import Select from "./Select";

const BirthdaySelector = ({
  labelStyle,
  hideLabel,
  label,
  className,
  errorMessage,
  hideError,
  id,
  type,
  containerStyle,
  children,
  onChange,
  name,
  value,
}) => {
  return (
    <div className={`w-full input relative ${containerStyle}`}>
      {hideLabel ? null : (
        <label htmlFor={id} className={`${labelStyle}`}>
          {label}
        </label>
      )}

      <div className={"relative mt-1"}>
        <DateSelect
          startYear={1950}
          value={value}
          onChange={onChange}
          name={name}
        />

        {children}
      </div>

      {!hideError && (
        <p className=" text-13px error text-left" id="email-error">
          {errorMessage}
        </p>
      )}
    </div>
  );
};

export default BirthdaySelector;
