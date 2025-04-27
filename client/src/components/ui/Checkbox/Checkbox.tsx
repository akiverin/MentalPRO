import { FC, InputHTMLAttributes, useState } from "react";
import classNames from "classnames";
import "./Checkbox.scss";
import IconCheck from "../icons/IconCheck";

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
      <span className="checkbox__box">{isChecked && <IconCheck />}</span>
      {children && <span className="checkbox__label">{children}</span>}{" "}
    </label>
  );
};

export default Checkbox;
