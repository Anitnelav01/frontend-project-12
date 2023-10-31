import { Navbar, Container, Button } from 'react-bootstrap';
import { Link, useNavigate  } from 'react-router-dom';
import useAuth from '../hooks/useAuth.jsx';
import routes from '../routes.js';

const Header = () => {
    const { logOut, user } = useAuth();
    const navigate = useNavigate();
    const handlerClick = () => {
        logOut();
        console.log(logOut());
        navigate(routes.loginPagePath());
    };
    
    return (
        <Navbar bg='white' expand='lg' className='shadow-sm'>
            <Container>
                <Navbar.Brand as={Link} to={routes.chatPagePath()}>
                    Hexlet Chat
                </Navbar.Brand>
                {user ? <Button type='button' className='btn btn-primary' onClick={handlerClick}>Выйти</Button> : null }
            </Container>
        </Navbar>
    );
};

export default Header;