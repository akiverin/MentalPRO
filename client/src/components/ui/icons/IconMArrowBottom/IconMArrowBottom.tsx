import Icon, { IconProps } from "../Icon";

const IconMArrowBottom: React.FC<IconProps> = (props) => {
  return (
    <Icon width={16} height={16} viewBox="0 0 16 16" {...props}>
      <path
        d="M4 6L8 10L12 6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Icon>
  );
};

export default IconMArrowBottom;
