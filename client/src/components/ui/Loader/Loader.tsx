import { FC } from 'react';
import classNames from 'classnames';
import './Loader.scss';
import Icon from '../icons/Icon';

interface LoaderProps {
  className?: string;
}

const Loader: FC<LoaderProps> = ({ className = '' }) => {
  return (
    <div className={classNames('loader', className)}>
      <Icon width={50} height={50} viewBox="25 25 50 50">
        <circle r="20" cy="50" cx="50"></circle>
      </Icon>
    </div>
  );
};

export default Loader;
