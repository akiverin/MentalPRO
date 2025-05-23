import Icon, { IconProps } from '../Icon';

const IconCrown: React.FC<IconProps> = (props) => {
  return (
    <Icon {...props}>
      <path
        fill="#ffbb5d"
        d="M14 5c0 .53-.206 1.012-.543 1.37l2.624 3.28a.25.25 0 0 0 .307.068l2.65-1.326A2.004 2.004 0 0 1 21 6a2 2 0 0 1 .444 3.95l-1.804 9.623A1.75 1.75 0 0 1 17.92 21H6.08a1.75 1.75 0 0 1-1.72-1.427L2.556 9.95a2 2 0 1 1 2.406-1.558l2.65 1.326a.25.25 0 0 0 .307-.068l2.624-3.28A2 2 0 1 1 14 5Zm-2 12a2 2 0 1 0 0-4a2 2 0 0 0 0 4Z"
      />
    </Icon>
  );
};

export default IconCrown;
