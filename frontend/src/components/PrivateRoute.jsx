import { useAuthContext } from '../contexts/index.jsx';
import Chat from './Chat.jsx';
import Login from './Login.jsx';

const PrivateRoute = () => {
  const { user } = useAuthContext();

  return (
    user ? (<Chat />) : (<Login />)
  );
};

export default PrivateRoute;