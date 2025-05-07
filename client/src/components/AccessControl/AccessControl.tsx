import { FC, ReactNode } from 'react';
import { observer } from 'mobx-react-lite';
import { userStore } from '@/entities/user/stores/userStoreInstance';

interface AccessControlProps {
  children: ReactNode;
  requiredRoles?: string[];
  fallback?: ReactNode;
}

const AccessControl: FC<AccessControlProps> = observer(({ children, requiredRoles = [], fallback = null }) => {
  const { user, meta } = userStore;
  if (meta === 'loading' && !user) {
    return null;
  }
  if (!user) {
    return <>{fallback}</>;
  }
  if (requiredRoles.length > 0 && !requiredRoles.includes(user.role)) {
    return <>{fallback}</>;
  }
  return <>{children}</>;
});

export default AccessControl;
