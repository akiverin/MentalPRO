import './App.css';
import TheFooter from './components/TheFooter/TheFooter';
import TheHeader from './components/TheHeader/TheHeader';
import { useLocation, Outlet } from 'react-router-dom';
import './styles/main.scss';
import { useEffect, useLayoutEffect } from 'react';
import { userStore } from './entities/user/stores/userStoreInstance';
import { observer } from 'mobx-react-lite';

const App = observer(() => {
  const location = useLocation();

  useEffect(() => {
    if (!userStore.isAuthenticated) {
      userStore.me();
    }
  }, []);

  useLayoutEffect(() => {
    document.documentElement.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <>
      <TheHeader />
      <main>
        <Outlet />
      </main>
      <TheFooter />
    </>
  );
});

export default App;
