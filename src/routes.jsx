import React from 'react';
import { Navigate } from 'react-router-dom';
import { useContext } from 'react';
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


function AuthenticatedRoute({ element }) {
  const { user } = useContext(UserContext);
  return user ? element : <Navigate to="/login" />;
}

function AdminRoute({ element }) {
  const { user } = useContext(UserContext);
  return user && user.role === 'admin' ? element : <Navigate to="/login" />;
}

const routes = [
  { path: '/', element: <Navigate to="/dashboard" /> },
  { path: '/login', element: <LoginPage /> },
  { path: '/dashboard', element: <AuthenticatedRoute element={<UserDashboard />} /> },
  { path: '/admin-dashboard', element: <AdminRoute element={<AdminDashboard />} /> },
  { path: '/global-tracking', element: <AuthenticatedRoute element={<GlobalTracking />} />, 
  children:[
    {
      path:'/global-tracking/:id',
      element:<User/>
    },
    {
      path:'/global-tracking/indicateur',
      element:"Hello world",
    },
    {
      path:'/global-tracking/absence',
      element:"Hello world",
    },
    {
      path:'/global-tracking/Effectif',
      element:"Hello world",
    },
    {
      path:'/global-tracking/singleEmployee',
      element:"Hello world",
    },
  ] },
  { path: '/pointage', element: <AuthenticatedRoute element={<Pointage />} /> },
  { path: '/admin', element: <AdminRoute element={<AdminPage />} /> },
  { path: '/report', element: <AuthenticatedRoute element={<Report />} /> },
  { path: '/notifications', element: <AuthenticatedRoute element={<Notifications />} /> },
  { path: '/profile', element: <AuthenticatedRoute element={<ProfilePage />} /> },
  { path: '/reset-password', element: <ResetPasswordPage /> },
  { path: '/first-time-password-reset', element: <AuthenticatedRoute element={<FirstTimePasswordResetPage />} /> },
  { path: '/search-results', element: <AuthenticatedRoute element={<SearchResults />} /> },
  { path: '/add-user', element: <AdminRoute element={<AddUserPage />} /> },
  { path: '/user', element: <AdminRoute element={<User />} /> },

];

export default routes;
