import { FC, ButtonHTMLAttributes } from "react";
import classNames from "classnames";
import "./Button.scss";

export type ButtonBackground = "primary" | "secondary" | "light";
export type ButtonVariant = "default" | "rounded";
export type ButtonSize = "small" | "medium" | "large";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  background?: ButtonBackground;
  fullWidth?: boolean;
  className?: string;
}

const Button: FC<ButtonProps> = ({
  children,
  variant = "default",
  background = "primary",
  fullWidth = false,
  className = "",
  disabled = false,
  size = "medium",
  ...rest
}) => {
  const buttonClasses = classNames(
    "button",
    `button--${variant}`,
    `button--${background}`,
    `button--${size}`,
    {
      "button--full-width": fullWidth,
      "button--disabled": disabled,
    },
    className
  );

  return (
    <button className={buttonClasses} disabled={disabled} {...rest}>
      {children}
    </button>
  );
};

export default Button;
