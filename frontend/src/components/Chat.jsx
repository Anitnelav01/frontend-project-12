import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { Container, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import { loadChannels } from '../slices/channelsSlice.js';
import routes from '../routes.js';
import useAuth from '../hooks/useAuth.jsx';
import Channels from './Channels.jsx';
import Messages from './Messages.jsx';
import ModalComponent from './ModalComponent.jsx';

const Chat = () => {
  const { t } = useTranslation();
  const auth = useAuth();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [fetched, setFetched] = useState(false);
  useEffect(
    () => {
      const fetchChat = async (token) => {
        try {
          const { data } = await axios.get(routes.usersPath(), {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          dispatch(loadChannels(data));
          setFetched(true);
        } catch (error) {
          if (!error.isAxiosError) {
            toast.error(t('errors.unknown'));
            return;
          }
          if (error.response.status === 401) {
            navigate(routes.loginPagePath());
          } else {
            toast.error(t('errors.network'));
          }
        }
      };

      fetchChat(auth.user.token);
    },
    [dispatch, navigate, t],
  );

  return (
    fetched ? (
      <Container className="h-100 my-4 overflow-hidden rounded shadow">
        <ModalComponent />
        <Row className="h-100 bg-white flex-md-row">
          <Channels />
          <Messages />
        </Row>
      </Container>
    ) : null
  );
};

export default Chat;
