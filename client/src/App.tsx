import "./App.css";
import TheFooter from "./components/TheFooter/TheFooter";
import TheHeader from "./components/TheHeader/TheHeader";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Registration from "./pages/Registration/Registration";
import Profile from "./pages/Profile/Profile";
import Cases from "./pages/Cases/Cases";
import TheCase from "./pages/TheCase/TheCase";
import Organizations from "./pages/Organizations/Organizations";
import TheOrganization from "./pages/TheOrganization/TheOrganization";
import Surveys from "./pages/Surveys/Surveys";
import TheSurvey from "./pages/TheSurvey/TheSurvey";
import Quest from "./pages/Quest/Quest";
import "./styles/main.scss";
import NotFound from "./pages/NotFound/NotFound";
import Privacy from "./pages/Privacy/Privacy";

function App() {
  return (
    <Router>
      <TheHeader />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/registration" element={<Registration />} />
          <Route path="/profile" element={<Profile />} />

          <Route path="/cases" element={<Cases />} />
          <Route path="/cases/:id" element={<TheCase />} />

          <Route path="/organizations" element={<Organizations />} />
          <Route path="/organizations/:id" element={<TheOrganization />} />

          <Route path="/surveys" element={<Surveys />} />
          <Route path="/surveys/:link/" element={<TheSurvey />} />

          <Route path="/surveys/:link/quest" element={<Quest />} />

          <Route path="*" element={<NotFound />} />
          <Route path="/privacy" element={<Privacy />} />
        </Routes>
      </main>
      <TheFooter />
    </Router>
  );
}

export default App;
