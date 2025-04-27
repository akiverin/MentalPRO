import classNames from "classnames";
import "./Icon.scss";

export type IconProps = React.SVGAttributes<SVGElement> & {
  className?: string;
  width?: number;
  height?: number;
  viewBox?: string;
};

const Icon: React.FC<React.PropsWithChildren<IconProps>> = ({
  className,
  children,
  height,
  width,
  viewBox,
  ...props
}: IconProps) => {
  return (
    <svg
      className={classNames(className)}
      width={width || "24"}
      height={height || "24"}
      viewBox={viewBox || "0 0 24 24"}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      {children}
    </svg>
  );
};

export default Icon;
