import React, { useState } from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
 // Navigate,
  //useLocation,
} from 'react-router-dom';
import NotFound from './components/NotFound.jsx';
import Chat from './components/Chat.jsx';
import Login from './components/Login.jsx';
import Header from './components/Header.jsx';
import AuthContext from './contexts/index.jsx';
import useAuth from './hooks/useAuth.jsx';
import routes from './routes.js';

const AuthProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(false);

  const logIn = () => setLoggedIn(true);
  const logOut = () => {
    localStorage.removeItem('user');
    setLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ loggedIn, logIn, logOut }}>
      {children}
    </AuthContext.Provider>
  );
};

const PrivateRoute = ({ children }) => {
  const auth = useAuth();
  //const location = useLocation();

  return (
    auth.loggedIn ? children : <Login />
  );
};

const App = () => (
  <AuthProvider>
    <div className='d-flex flex-column h-100'>
      <BrowserRouter>
      <Header />
      <Routes>
        <Route path={routes.chatPagePath()} element={<PrivateRoute><Chat /></PrivateRoute>} />
        <Route path='/login' element={<Login />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
      </BrowserRouter>
      </div>
  </AuthProvider>
);

export default App;