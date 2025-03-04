import { FC, HTMLAttributes } from "react";
import classNames from "classnames";
import "./Badge.scss";

export type BadgeVariant = "default" | "small";

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
  className?: string;
}

const Badge: FC<BadgeProps> = ({
  variant = "default",
  className = "",
  children,
  ...rest
}) => {
  const badgeClasses = classNames("badge", `badge--${variant}`, className);

  return (
    <span className={badgeClasses} {...rest}>
      {children}
    </span>
  );
};

export default Badge;
