import './App.css'
import './index.css'
import React, { createContext, useContext } from 'react';
import App from '../App';

// Define the context type
interface AuthenticationContextType {
  isAuthenticated: boolean;
}

// Create the context
const AuthenticationContext = createContext<AuthenticationContextType | undefined>(undefined);

// Create the provider component
interface AuthenticationProviderProps {
  isAuthenticated: boolean;
}

const AuthenticationProvider: React.FC<AuthenticationProviderProps> = ({ isAuthenticated }) => {
  return (
    <AuthenticationContext.Provider value={{ isAuthenticated }}>
    <App />
    </AuthenticationContext.Provider>
  );
};

export { AuthenticationProvider, AuthenticationContext };
