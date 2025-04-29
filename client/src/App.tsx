import "./App.css";
import TheFooter from "./components/TheFooter/TheFooter";
import TheHeader from "./components/TheHeader/TheHeader";
import { useLocation, Outlet } from "react-router-dom";
import "./styles/main.scss";
import { useLayoutEffect } from "react";

function App() {
  const location = useLocation();

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
}

export default App;
