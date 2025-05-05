import { FC, ReactNode } from 'react';
import classNames from 'classnames';
import './Error.scss';
import IconAlert from '../icons/IconAlert';

interface ErrorProps {
  children: ReactNode;
  className?: string;
}

const Error: FC<ErrorProps> = ({ children, className = '' }) => {
  return (
    <div className={classNames('error', className)}>
      <div className="error__icon">
        <IconAlert />
      </div>
      <div className="error__title">{children}</div>
    </div>
  );
};

export default Error;
