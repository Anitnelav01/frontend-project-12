import React from 'react';
import {
  BrowserRouter, Routes, Route,
} from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import NotFound from './components/NotFound.jsx';
import Header from './components/Header.jsx';
import routes from './routes.js';
import Login from './components/Login.jsx';
import AuthProvider from './components/AuthProvider.jsx';
import PrivateRoute from './components/PrivateRoute.jsx';
import SignUp from './components/SignUp.jsx';

const App = () => (
  <AuthProvider>
    <div className="d-flex flex-column h-100">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path={routes.chatPagePath()} element={<PrivateRoute />} />
          <Route path={routes.loginPagePath()} element={<Login />} />
          <Route path="*" element={<NotFound />} />
          <Route path={routes.signupPagePath()} element={<SignUp />} />
        </Routes>
      </BrowserRouter>
    </div>
    <ToastContainer />
  </AuthProvider>
);

export default App;
