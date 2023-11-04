import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.css';
import { init } from './init.jsx';

const app = () => {
    const root = ReactDOM.createRoot(document.getElementById('root'));
    const vdom = init();
    root.render(vdom);
};

app();