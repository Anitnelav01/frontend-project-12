import { createContext, useContext } from 'react';

export const AuthContext = createContext({});
export const useAuthContext = () => useContext(AuthContext);

export const SocketContext = createContext(null);
export const useSocketContext = () => useContext(SocketContext);
