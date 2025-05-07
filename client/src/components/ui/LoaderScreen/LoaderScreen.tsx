import { FC } from 'react';
import classNames from 'classnames';
import './LoaderScreen.scss';
import Loader from '../Loader/Loader';

interface LoaderScreenProps {
  className?: string;
}

const LoaderScreen: FC<LoaderScreenProps> = ({ className = '' }) => {
  return (
    <div className={classNames('loader-screen', className)}>
      <Loader />
    </div>
  );
};

export default LoaderScreen;
