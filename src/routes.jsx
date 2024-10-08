import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import UserDashboard from './pages/UserDashboard';
import AdminDashboard from './pages/AdminDashboard';
import GlobalTracking from './pages/GlobalTracking';
import Pointage from './pages/Pointage';
import AdminPage from './pages/AdminPage';
import Report from './pages/Report';
import Notifications from './pages/Notifications';
import ProfilePage from './pages/ProfilePage';
import ResetPasswordPage from './pages/ResetPasswordPage';
import FirstTimePasswordResetPage from './pages/FirstTimePasswordResetPage';
import SearchResults from './pages/SearchResults';
import AddUserPage from './pages/AddUserPage';
import User from './pages/User';
import { UserContext } from './UserContext';
import Infos from './components/UserInfos/Infos';
import Contract from './components/UserInfos/Contract';
import Client from './components/Client';
import Clients from './pages/Clients';

function AuthenticatedRoute({ element }) {
  const { user, loading } = useContext(UserContext);

  if (loading) {
    return <div>Loading...</div>; // Indicateur de chargement pendant la vérification de l'authentification
  }

  return user ? element : <Navigate to="/login" />;
}

function AdminRoute({ element }) {
  const { user, loading } = useContext(UserContext);

  if (loading) {
    return <div>Loading...</div>; // Indicateur de chargement pendant la vérification de l'authentification
  }

  return user && user.role === 'admin' ? element : <Navigate to="/login" />;
}

function UserRoute({ element }) {
  const { user, loading } = useContext(UserContext);

  if (loading) {
    return <div>Loading...</div>; // Indicateur de chargement pendant la vérification de l'authentification
  }

  return user && user.role === 'utilisateur' || user.role === 'admin' ?  element : <Navigate to="/login" />;
}

const routes = [
  { path: '/', element: <Navigate to="/dashboard" /> },
  { path: '/login', element: <LoginPage /> },
  { path: '/dashboard', element: <AuthenticatedRoute element={<UserDashboard />} /> },
  { path: '/admin-dashboard', element: <AdminRoute element={<AdminDashboard />} /> },
  { path: '/global-tracking', element: <AuthenticatedRoute element={<GlobalTracking />} /> },
  { path: '/clients', element: <AuthenticatedRoute element={<Clients />} /> },
  { path: '/pointage', element: <AuthenticatedRoute element={<Pointage />} /> },
  { path: '/admin', element: <AdminRoute element={<AdminPage />} /> },
  { path: '/report', element: <AuthenticatedRoute element={<Report />} /> },
  { path: '/notifications', element: <AuthenticatedRoute element={<Notifications />} /> },
  { path: '/profile', element: <AuthenticatedRoute element={<ProfilePage />} /> },
  { path: '/reset-password', element: <ResetPasswordPage /> },
  { path: '/first-time-password-reset', element: <AuthenticatedRoute element={<FirstTimePasswordResetPage />} /> },
  { path: '/search-results', element: <AuthenticatedRoute element={<SearchResults />} /> },
  { path: '/add-user', element: <AdminRoute element={<AddUserPage />} /> },
  { 
    path: 'user/:name',
    element: <UserRoute element={<User />} />,
    children:[
      {
        path: '/user/:name',
        element: <Infos />,
      },
      {
        path: '/user/:name/infos',
        element: <Infos />,
      },
      {
        path: '/user/:name/contract',
        element: <Contract/>,
      },
      {
        path: '/user/:name/pointage',
        element: '',
      },
      {
        path: '/user/:name/report',
        element: '',
      },
      
    ]
  },

  { 
    path: '/client/:clientName',
    element: <UserRoute element={<Client />} />,
    children:[
      {
        path: '/client/:clientName',
        element: "Hello",
      },
      {
        path: '/client/:clientName/infos',
        element: "Informations générales",
      },
      {
        path: '/client/:clientName/contract',
        element: "Contrat",
      },
      {
        path: '/client/:clientName/stats',
        element: 'Historique',
      },
      {
        path: '/client/:clientName/report',
        element: '',
      },
    ]
  },
];

export default routes;
