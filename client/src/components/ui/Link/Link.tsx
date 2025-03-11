import { FC, AnchorHTMLAttributes } from "react";
import { Link, LinkProps } from "react-router-dom";
import classNames from "classnames";
import "./Link.scss";

export type LinkBackground =
  | "bg-none"
  | "primary"
  | "secondary"
  | "light"
  | "transparent";

export type LinkVariant =
  | "default"
  | "button"
  | "rounded"
  | "text"
  | "navigation";

interface TheLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  variant?: LinkVariant;
  icon?: boolean;
  background?: LinkBackground;
  fullWidth?: boolean;
  small?: boolean;
  className?: string;
  disabled?: boolean;
  href?: string;
  to?: LinkProps["to"];
}

const TheLink: FC<TheLinkProps> = ({
  children,
  variant = "default",
  background = "bg-none",
  fullWidth = false,
  className = "",
  small = false,
  disabled = false,
  icon = false,
  to = "",
  href = "",
  ...rest
}) => {
  const linkClasses = classNames(
    "link",
    `link--${variant}`,
    `link--${background}`,
    {
      "link--full-width": fullWidth,
      "link--disabled": disabled,
      "link--small": small,
      "link--icon": icon,
    },
    className
  );

  if (to) {
    return (
      <Link className={linkClasses} to={to} {...rest}>
        {children}
      </Link>
    );
  }

  if (disabled) {
    return (
      <span className={linkClasses} aria-disabled="true">
        {children}
      </span>
    );
  }

  return (
    <a className={linkClasses} href={href} {...rest}>
      {children}
    </a>
  );
};

export default TheLink;
