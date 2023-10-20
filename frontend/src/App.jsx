import React from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom';
import NotFound from './components/NotFound.jsx';
import Chat from './components/Chat.jsx';
import Login from './components/Login.jsx';
import Header from './components/Header.jsx';
import routes from './routes.js';
import { SocketContext } from './contexts/index.jsx';
import { api } from './contexts/socketContext.js';
import AuthProvider from './components/AuthProvider.jsx';
import PrivateRoute from './components/PrivateRoute.jsx';

const App = () => (
  <AuthProvider>
    <SocketContext.Provider value={api}>
      <div className='d-flex flex-column h-100'>
        <BrowserRouter>
        <Header />
        <Routes>
          <Route path={routes.chatPagePath()} element={<PrivateRoute><Chat /></PrivateRoute>} />
          <Route path='/login' element={<PrivateRoute><Login /></PrivateRoute>} />
          <Route path='*' element={<NotFound />} />
        </Routes>
        </BrowserRouter>
      </div>
    </SocketContext.Provider>
  </AuthProvider>
);

export default App;