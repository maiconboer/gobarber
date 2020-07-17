import React from 'react';
import { AuthProvider } from './AuthContext';

const AppProvider = ({ children }) => (
  <AuthProvider>
    {children}
  </AuthProvider>
);

export default AppProvider;
