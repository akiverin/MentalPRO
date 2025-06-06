import Icon, { IconProps } from "../Icon";

const IconTg: React.FC<IconProps> = (props) => {
  return (
    <Icon width={28} height={28} viewBox="0 0 28 28" {...props}>
      <g clipPath="url(#clip0_853_1429)">
        <path
          fill="url(#paint0_linear_853_1429)"
          d="M14 28C21.732 28 28 21.732 28 14C28 6.26801 21.732 0 14 0C6.26801 0 0 6.26801 0 14C0 21.732 6.26801 28 14 28Z"
        />
        <path
          fill="#fff"
          d="M20.8141 8.05549L18.3148 20.661C18.3148 20.661 17.9648 21.536 17.0023 21.1149L11.2328 16.6906L9.13281 15.6789L5.6 14.4922C5.6 14.4922 5.05859 14.3008 5.0039 13.8797C4.94922 13.4586 5.6164 13.2344 5.6164 13.2344L19.6602 7.72736C19.6602 7.72189 20.8141 7.2133 20.8141 8.05549Z"
        />
        <path
          fill="#D2E4F0"
          d="M10.7844 20.5188C10.7844 20.5188 10.6148 20.5024 10.407 19.8407C10.1992 19.179 9.13281 15.679 9.13281 15.679L17.6148 10.2923C17.6148 10.2923 18.107 9.99695 18.0852 10.2923C18.0852 10.2923 18.1727 10.3469 17.9102 10.5876C17.6477 10.8337 11.2492 16.5868 11.2492 16.5868"
        />
        <path
          fill="#B5CFE4"
          d="M13.4422 18.3859L11.1617 20.4695C11.1617 20.4695 10.9812 20.6063 10.7898 20.5188L11.2273 16.6523"
        />
      </g>
      <defs>
        <linearGradient
          id="paint0_linear_853_1429"
          x1="14"
          x2="14"
          y1="0"
          y2="27.898"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#41BCE7" />
          <stop offset="1" stopColor="#22A6DC" />
        </linearGradient>
        <clipPath id="clip0_853_1429">
          <rect width="28" height="28" fill="#fff" />
        </clipPath>
      </defs>
    </Icon>
  );
};

export default IconTg;
