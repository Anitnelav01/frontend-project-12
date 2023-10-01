import { Navbar, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Header = () => (
    <Navbar bg='white' expand='lg' className='shadow-sm'>
        <Container>
            <Navbar.Brand as={Link} to='/'>
                Hexlet Chat
            </Navbar.Brand>
        </Container>
    </Navbar>
);

export default Header;
