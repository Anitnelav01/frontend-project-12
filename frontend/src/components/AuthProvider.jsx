import { useState } from 'react';
import { AuthContext } from '../contexts/index.jsx';

const AuthProvider = ({ children }) => {
  const currentUser  = JSON.parse(localStorage.getItem('user'));
  const [user, setUser] = useState(currentUser ? currentUser.username : null); 

  const logIn = (userData) => {
    localStorage.setItem('user', JSON.stringify(userData));
    setUser({ username: userData.username });
  };

  const logOut = () => {
    localStorage.clear();
    setUser(null);
  };
  
  return (
    <AuthContext.Provider value={{ logOut, logIn, user }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;