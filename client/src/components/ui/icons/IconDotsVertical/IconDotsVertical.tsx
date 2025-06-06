import Icon, { IconProps } from '../Icon';

const IconDotsVertical: React.FC<IconProps> = (props) => {
  return (
    <Icon {...props}>
      <g>
        <path d="M0 0h24v24H0z" fill="none" />

        <path
          fill="currentColor"
          d="M12 3c-.825 0-1.5.675-1.5 1.5S11.175 6 12 6s1.5-.675 1.5-1.5S12.825 3 12 3zm0 15c-.825 0-1.5.675-1.5 1.5S11.175 21 12 21s1.5-.675 1.5-1.5S12.825 18 12 18zm0-7.5c-.825 0-1.5.675-1.5 1.5s.675 1.5 1.5 1.5 1.5-.675 1.5-1.5-.675-1.5-1.5-1.5z"
        />
      </g>
    </Icon>
  );
};

export default IconDotsVertical;
