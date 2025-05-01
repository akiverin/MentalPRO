// src/config/routesConfig.tsx
import { RouteObject, Navigate } from 'react-router-dom';
import App from '../App';
import Home from '../pages/Home/Home';
import Login from '../pages/auth/Login/Login';
// import Registration from "../pages/auth/Registration/Registration";
// import Profile from "../pages/auth/Profile/Profile";
import Cases from '../pages/Cases/Cases';
import TheCase from '../pages/TheCase/TheCase';
import Organizations from '../pages/Organizations/Organizations';
import TheOrganization from '../pages/TheOrganization/TheOrganization';
import Surveys from '../pages/Surveys/Surveys';
import TheSurvey from '../pages/TheSurvey/TheSurvey';
// import Quest from "../pages/Quest/Quest";
import Privacy from '../pages/Privacy/Privacy';
import { routes } from './routes';
import YandexOAuth from '@/pages/auth/YandexOAuth';

export const routesConfig: RouteObject[] = [
  {
    path: routes.main.mask,
    element: <App />,
    children: [
      { path: routes.main.mask, element: <Home /> },
      { path: routes.login.mask, element: <Login /> },
      //   { path: routes.registration.mask, element: <Registration /> },
      //   { path: routes.profile.mask, element: <Profile /> },
      { path: routes.cases.mask, element: <Cases /> },
      { path: routes.case.mask, element: <TheCase /> },
      { path: routes.organizations.mask, element: <Organizations /> },
      { path: routes.organization.mask, element: <TheOrganization /> },
      { path: routes.surveys.mask, element: <Surveys /> },
      { path: routes.survey.mask, element: <TheSurvey /> },
      //   { path: routes.quest.mask, element: <Quest /> },
      { path: routes.privacy.mask, element: <Privacy /> },
      {
        path: routes.yandexOauth.mask,
        element: <YandexOAuth />,
      },
    ],
  },
  {
    path: '*',
    element: <Navigate to={routes.main.mask} replace />,
  },
];
