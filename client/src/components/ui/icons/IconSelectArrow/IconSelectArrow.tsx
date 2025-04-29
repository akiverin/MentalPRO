import Icon, { IconProps } from "../Icon";

const IconSelectArrow: React.FC<IconProps> = (props) => {
  return (
    <Icon {...props}>
      <path
        d="M7 16L12 21L17 16"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M17 8L12 3L7 8"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Icon>
  );
};

export default IconSelectArrow;
