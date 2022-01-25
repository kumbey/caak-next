import { IMaskInput } from "react-imask";
import moment from "moment";

const DateInput = ({
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
  placeholder,
  format,
  value,
  onChange,
  setText,
  ...props
}) => {
  return (
    <div className={`w-full input relative ${containerStyle}`}>
      {hideLabel ? null : (
        <label htmlFor={id} className={`${labelStyle}`}>
          {label}
        </label>
      )}
      <IMaskInput
        {...props}
        className={`${className}  ${
          errorMessage ? `border border-caak-red` : ``
        }`}
        onInput={onChange}
        value={value}
        mask={Date}
        pattern={format}
        lazy={false}
        min={new Date(1900, 0, 1)}
        max={new Date(2090, 0, 1)}
        format={function (date) {
          return moment(date).format(format);
        }}
        parse={function (str) {
          return moment(str, format);
        }}
        blocks={{
          YYYY: {
            mask: IMask.MaskedRange,
            from: 1900,
            to: 2090,
          },
          MM: {
            mask: IMask.MaskedRange,
            from: 1,
            to: 12,
          },
          DD: {
            mask: IMask.MaskedRange,
            from: 1,
            to: 31,
          },
        }}
      />
      {!hideError && (
        <p className=" text-13px error text-left" id="email-error">
          {errorMessage}
        </p>
      )}
    </div>
  );
};

export default DateInput;
