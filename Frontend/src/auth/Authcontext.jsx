import React, { createContext, useContext, useState } from 'react';

// 1. Create context
const AuthContext = createContext();

// 2. AuthProvider to wrap your app
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

// 3. Custom hook to use the auth context
export const useAuth = () => useContext(AuthContext);

