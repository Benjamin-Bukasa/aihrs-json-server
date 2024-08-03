import React from 'react';
import { useRoutes, useLocation } from 'react-router-dom';
import { UserProvider } from './UserContext';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import routes from './routes';
import { useState } from 'react';
import './App.css';

function App() {
  const location = useLocation();
  const routing = useRoutes(routes);
  const [sidebarToggle, setSidebarToggle] = useState(false)

  // Routes where the Navbar and Sidebar should not be displayed
  const noNavbarSidebarRoutes = ['/login', '/reset-password', '/first-time-password-reset'];

  return (
    <UserProvider>
      <div className="flex justify-start items-start">
        {!noNavbarSidebarRoutes.includes(location.pathname) && <Sidebar sidebarToggle={sidebarToggle} setSidebarToggle = {setSidebarToggle}/>}
        <div className={`${sidebarToggle ? "":"ml-64 transition ease-in-out delay-1500 "} w-full h-screen transition ease-in-out delay-1500`}>
        {!noNavbarSidebarRoutes.includes(location.pathname) && <Navbar sidebarToggle={sidebarToggle} setSidebarToggle = {setSidebarToggle}/>}
          {routing}
        </div>
      </div>
    </UserProvider>
  );
}

export default App;
