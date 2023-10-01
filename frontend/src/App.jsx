import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NotFound from './components/NotFound.jsx';
import Login from './components/Login.jsx';
import Header from './components/Header.jsx';

const App = () => (
    <div className='d-flex flex-column h-100'>
      <BrowserRouter>
      <Header />
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
      </BrowserRouter>
    </div>
);

export default App;