// src/config/routesConfig.tsx
import { RouteObject, Navigate } from 'react-router-dom';
import App from '../App';
import Home from '../pages/Home/Home';
import Login from '../pages/auth/Login';
import Registration from '../pages/auth/Registration';
import Profile from '../pages/auth/Profile';
import Cases from '../pages/Cases';
import TheCase from '../pages/TheCase';
import Organizations from '../pages/Organizations';
import TheOrganization from '../pages/TheOrganization';
import Surveys from '../pages/Surveys/Surveys';
import TheSurvey from '../pages/TheSurvey/TheSurvey';
import Quest from '../pages/Quest/Quest';
import Privacy from '../pages/Privacy/Privacy';
import { routes } from './routes';
import OAuth from '@/pages/auth/OAuth';
import CreateSurvey from '@/pages/Surveys/CreateSurvey';
import PrivateRoute from '@/components/PrivateRoute';
import CreateCase from '@/pages/Cases/CreateCase';
import UpdateCase from '@/pages/Cases/UpdateCase/UpdateCase';
import UpdateUser from '@/pages/auth/Profile/UpdateUser/UpdateUser';
import CreateOrganization from '@/pages/Organizations/CreateOrganization';

export const routesConfig: RouteObject[] = [
  {
    path: routes.main.mask,
    element: <App />,
    children: [
      { path: routes.main.mask, element: <Home /> },
      { path: routes.login.mask, element: <Login /> },
      { path: routes.registration.mask, element: <Registration /> },
      {
        path: routes.profile.mask,
        element: (
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        ),
      },
      {
        path: routes.profileUpdate.mask,
        element: (
          <PrivateRoute>
            <UpdateUser />
          </PrivateRoute>
        ),
      },
      { path: routes.cases.mask, element: <Cases /> },

      {
        path: routes.case.mask,
        element: (
          <PrivateRoute>
            <TheCase />
          </PrivateRoute>
        ),
      },
      {
        path: routes.caseCreate.mask,
        element: (
          <PrivateRoute>
            <CreateCase />
          </PrivateRoute>
        ),
      },
      {
        path: routes.caseUpdate.mask,
        element: (
          <PrivateRoute>
            <UpdateCase />
          </PrivateRoute>
        ),
      },
      { path: routes.organizations.mask, element: <Organizations /> },
      {
        path: routes.organizationCreate.mask,
        element: (
          <PrivateRoute requiredRoles={['admin', 'hr']}>
            <CreateOrganization />
          </PrivateRoute>
        ),
      },
      {
        path: routes.organization.mask,
        element: (
          <PrivateRoute>
            <TheOrganization />
          </PrivateRoute>
        ),
      },
      { path: routes.surveys.mask, element: <Surveys /> },
      {
        path: routes.survey.mask,
        element: (
          <PrivateRoute>
            <TheSurvey />
          </PrivateRoute>
        ),
      },
      {
        path: routes.surveyCreate.mask,
        element: (
          <PrivateRoute requiredRoles={['admin']}>
            <CreateSurvey />
          </PrivateRoute>
        ),
      },
      {
        path: routes.quest.mask,
        element: (
          <PrivateRoute>
            <Quest />
          </PrivateRoute>
        ),
      },
      { path: routes.privacy.mask, element: <Privacy /> },
      {
        path: routes.yandexOauth.mask,
        element: <OAuth />,
      },
    ],
  },
  {
    path: '*',
    element: <Navigate to={routes.main.mask} replace />,
  },
];
