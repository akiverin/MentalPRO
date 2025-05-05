import React from "react";
import classNames from "classnames";
import "./Input.scss";

export type InputProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "onChange" | "value"
> & {
  value: string;
  fullWidth?: boolean;
  disabled?: boolean;
  className?: string;
  onChange: (value: string) => void;
};

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      value,
      onChange,
      className,
      fullWidth = false,
      disabled = false,
      ...props
    }: InputProps,
    ref,
  ) => {
    const inputClasses = classNames(
      "input",
      { "input--full-width": fullWidth },
      { "input--disabled": disabled },

      className,
    );
    return (
      <input
        ref={ref}
        type="text"
        value={value}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
          onChange(event.target.value)
        }
        className={inputClasses}
        {...props}
      />
    );
  },
);

export default Input;
