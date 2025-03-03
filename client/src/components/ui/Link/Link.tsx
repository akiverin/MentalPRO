import { FC, AnchorHTMLAttributes } from "react";
import { Link, LinkProps } from "react-router-dom";
import classNames from "classnames";
import "./Link.scss";

export type LinkBackground = "primary" | "secondary" | "light" | "transparent";
export type LinkVariant = "default" | "rounded";

interface TheLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  variant?: LinkVariant;
  icon?: boolean;
  background?: LinkBackground;
  fullWidth?: boolean;
  small?: boolean;
  className?: string;
  disabled?: boolean;
  to?: LinkProps["to"]; // This allows support for react-router's Link component
}

const TheLink: FC<TheLinkProps> = ({
  children,
  variant = "default",
  background = "primary",
  fullWidth = false,
  className = "",
  small = false,
  disabled = false,
  icon = false,
  to = "#",
  ...rest
}) => {
  const linkClasses = classNames(
    "link",
    `link--${variant}`,
    `link--${background}`,
    {
      "link--full-width": fullWidth,
    },
    {
      "link--disabled": disabled,
    },
    {
      "link--small": small,
    },
    {
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

  return (
    <a className={linkClasses} {...rest}>
      {children}
    </a>
  );
};

export default TheLink;
