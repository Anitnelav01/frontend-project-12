import ReactDOM from 'react-dom/client';
import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import App from './App.jsx';
import { Provider } from 'react-redux';
import configureStore from './slices/index.js';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store={configureStore}>
        <App />
    </Provider>
);