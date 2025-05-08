import { FC, HTMLAttributes } from 'react';
import classNames from 'classnames';
import './Badge.scss';

export type BadgeVariant = 'default' | 'small';
export type BadgeColor = 'default' | 'danger' | 'success';

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
  className?: string;
  color?: BadgeColor;
}

const Badge: FC<BadgeProps> = ({ variant = 'default', className = '', color = 'default', children, ...rest }) => {
  const badgeClasses = classNames('badge', `badge--${variant}`, `badgeColor--${color}`, className);

  return (
    <span className={badgeClasses} {...rest}>
      {children}
    </span>
  );
};

export default Badge;
