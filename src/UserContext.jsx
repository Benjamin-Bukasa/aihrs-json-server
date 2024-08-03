import React, { createContext, useState, useEffect } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const savedUser = localStorage.getItem('user') || sessionStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const loginUser = (user, rememberMe) => {
    setUser(user);
    if (rememberMe) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      sessionStorage.setItem('user', JSON.stringify(user));
    }
  };

  const logoutUser = () => {
    setUser(null);
    localStorage.removeItem('user');
    sessionStorage.removeItem('user');
  };

  return (
    <UserContext.Provider value={{ user, loginUser, logoutUser }}>
      {children}
    </UserContext.Provider>
  );
};