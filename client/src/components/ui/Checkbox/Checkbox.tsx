import { FC, InputHTMLAttributes, useState } from "react";
import classNames from "classnames";
import "./Checkbox.scss";

interface CheckboxProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "onChange"> {
  label?: string;
  checked?: boolean;
  disabled?: boolean;
  className?: string;
  onChange?: (checked: boolean) => void;
}

const Checkbox: FC<CheckboxProps> = ({
  children,
  checked = false,
  disabled = false,
  className = "",
  onChange,
  ...rest
}) => {
  const [isChecked, setIsChecked] = useState(checked);
  const handleChange = () => {
    if (disabled) return;
    const newChecked = !isChecked;
    setIsChecked(newChecked);
    onChange?.(newChecked);
  };

  const checkboxClasses = classNames(
    "checkbox",
    { "checkbox--checked": checked },
    { "checkbox--disabled": disabled },
    className
  );

  return (
    <label className={checkboxClasses}>
      <input
        type="checkbox"
        checked={isChecked}
        onChange={handleChange}
        disabled={disabled}
        className="visually-hidden"
        {...rest}
      />{" "}
      <span className="checkbox__box">
        {isChecked && (
          <svg
            width="20"
            height="14"
            viewBox="0 0 20 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M6.69047 13.8091L0.645011 7.76364C0.390465 7.50909 0.390465 7.06364 0.645011 6.74545L1.59956 5.79091C1.8541 5.53636 2.29956 5.53636 2.61774 5.79091L7.19956 10.3727L17.3814 0.190909C17.6359 -0.0636364 18.0814 -0.0636364 18.3996 0.190909L19.3541 1.14545C19.6086 1.4 19.6086 1.84545 19.3541 2.16364L7.70865 13.8091C7.39047 14.0636 6.94501 14.0636 6.69047 13.8091Z"
              fill="#0756CA"
            />
          </svg>
        )}
      </span>
      {children && <span className="checkbox__label">{children}</span>}{" "}
    </label>
  );
};

export default Checkbox;
