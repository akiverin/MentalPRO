import { FC, InputHTMLAttributes } from "react";
import classNames from "classnames";
import "./Input.scss";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  fullWidth?: boolean;
  disabled?: boolean;
  className?: string;
}

const Input: FC<InputProps> = ({
  fullWidth = false,
  className = "",
  disabled = false,
  ...rest
}) => {
  const inputClasses = classNames(
    "input",
    { "input--full-width": fullWidth },
    { "input--disabled": disabled },

    className
  );
  return <input className={inputClasses} {...rest} />;
};

export default Input;
