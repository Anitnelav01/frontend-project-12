import ReactDOM from 'react-dom/client';
import React from 'react';
import App from './App.jsx';
import { Provider } from 'react-redux';
import store from './slices/index.js';

import 'bootstrap/dist/css/bootstrap.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store={store}>
        <App />
    </Provider>
);