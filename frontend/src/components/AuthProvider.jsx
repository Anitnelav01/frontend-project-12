import { useState, useMemo  } from 'react';
import { AuthContext } from '../contexts/index.jsx';

const AuthProvider = ({ children }) => {
  const currentUser = JSON.parse(localStorage.getItem('user'));
  const [user, setUser] = useState(currentUser ? currentUser.username : null);

  const logIn = (userData) => {
    localStorage.setItem('user', JSON.stringify(userData));
    setUser({ username: userData.username });
  };

  const logOut = () => {
    localStorage.clear();
    setUser(null);
  };

  const auth = useMemo(() => ({ user, logIn, logOut }), [user, logIn, logOut]);
  
  return (
    <AuthContext.Provider value={auth}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;