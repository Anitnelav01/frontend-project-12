import imagePath from '../assets/notFound.svg';
import { Link } from 'react-router-dom';

const notFound = () => (
    <div className="text-center">
        <img className='img-fluid h-25' alt="Страница не найдена" src={imagePath} />
        <h1 className='h4 text-muted'>Страница не найдена</h1>
        <p className='text-muted'>
        Но вы можете перейти 
        <Link to='/'>на главную страницу</Link>
        </p>
    </div>
);

export default notFound;