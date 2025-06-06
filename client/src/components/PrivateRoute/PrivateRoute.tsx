import { FC, ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { userStore } from '@/entities/user/stores/userStoreInstance';
import { routes } from '@/config/routes';
import LoaderScreen from '../ui/LoaderScreen';

interface PrivateRouteProps {
  children: ReactNode;
  requiredRoles?: string[];
}

const PrivateRoute: FC<PrivateRouteProps> = observer(({ children, requiredRoles = [] }) => {
  const { user, meta } = userStore;

  if (meta === 'loading' && !user) {
    return <LoaderScreen />;
  }

  if (!localStorage.getItem('authToken') && meta !== 'success') {
    return <Navigate to={routes.login.mask} replace />;
  }

  if (user && requiredRoles.length > 0 && !requiredRoles.includes(user.role)) {
    return <Navigate to={routes.main.mask} replace />;
  }

  return <>{children}</>;
});

export default PrivateRoute;
