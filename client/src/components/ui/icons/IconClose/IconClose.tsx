import Icon, { IconProps } from "../Icon";

const IconClose: React.FC<IconProps> = (props) => {
  return (
    <Icon width={14} height={14} viewBox="0 0 14 14" {...props}>
      <path
        d="M1.28736 14L0 12.7126L5.72874 6.98391L0 1.28736L1.28736 0L7.01609 5.69655L12.7126 0L14 1.28736L8.30345 6.98391L14 12.7126L12.7126 14L7.01609 8.27126L1.28736 14Z"
        fill="currentColor"
      />
    </Icon>
  );
};

export default IconClose;
